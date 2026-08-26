import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback
} from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * A horizontal certificate Coverflow using the same direct-paint transition
 * engine as the Projects carousel.
 */
export function CircularCarousel({
  items = [],
  renderItem,
  autoPlayInterval = 4200,
  initialIndex = 0,
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
  categoryTransitionPhase = null,
  categoryTransitionDirection = 1,
  className = ""
}) {
  const total = items.length;
  const isControlled = Number.isInteger(controlledActiveIndex);
  const startingIndex = isControlled ? controlledActiveIndex : initialIndex;

  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const widthRef = useRef(0);
  const positionRef = useRef(startingIndex);
  const targetRef = useRef(startingIndex);
  const animationFrameRef = useRef(null);
  const dragRef = useRef(null);

  const [selected, setSelected] = useState(startingIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const indexAt = useCallback(
    (position) => {
      if (total === 0) return 0;
      return ((Math.round(position) % total) + total) % total;
    },
    [total]
  );

  // This mirrors the Projects Coverflow paint loop and its horizontal
  // translateX / translateZ / rotateY geometry.
  const paint = useCallback(() => {
    if (total === 0) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const width = widthRef.current || (isMobile ? 300 : 340);
    const gap = 0.08;
    const pitch = width * (1 + gap);
    const depth = 0.6 * width;
    const rotate = 44;
    const falloff = 0.56;
    const fade = 0.1;
    const position = positionRef.current;
    const categoryShift = categoryTransitionPhase === "out"
      ? -categoryTransitionDirection * pitch * 0.7
      : categoryTransitionPhase === "in"
        ? categoryTransitionDirection * pitch * 0.7
        : 0;
    const isCategoryFading =
      categoryTransitionPhase === "out" || categoryTransitionPhase === "in";

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Fold distance onto the shortest route around the ring, matching the
      // Projects carousel's seamless loop without cloning or reordering cards.
      let offset = index - position;
      offset = ((offset % total) + total) % total;
      if (offset > total / 2) offset -= total;

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);
      const x = offset * pitch + categoryShift;

      card.style.transform =
        `translate3d(calc(-50% + ${x}px), -50%, ${-depth * ramp}px) ` +
        `rotateY(${-tilt}deg)`;

      // Fade out before a looping card crosses the half-turn seam.
      const edge = total === 1
        ? 1
        : Math.min(1, Math.max(0, total / 2 - distance));
      const opacity = isCategoryFading
        ? 0
        : Math.max(0, 1 - fade * distance) * edge;
      const isActive = distance < 0.5;

      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - Math.round(distance));
      card.style.pointerEvents = distance <= 1 && opacity > 0.02 ? "auto" : "none";
      card.style.visibility = opacity > 0.02 || isCategoryFading ? "visible" : "hidden";
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-hidden", opacity > 0.02 ? "false" : "true");

      const certificateCard = card.firstElementChild;
      certificateCard?.classList.toggle("is-active", isActive);
    });
  }, [
    categoryTransitionDirection,
    categoryTransitionPhase,
    total
  ]);

  // Same exponential ease-out used by the Projects Coverflow. It produces a
  // controlled glide and can be retargeted safely while already in motion.
  const settle = useCallback(
    (target, notify = true) => {
      if (total === 0) return;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      targetRef.current = target;
      const nextIndex = indexAt(target);
      setSelected(nextIndex);
      if (notify) onActiveIndexChange?.(nextIndex);

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        positionRef.current = target;
        paint();
        animationFrameRef.current = null;
        return;
      }

      const step = () => {
        const remaining = target - positionRef.current;
        if (Math.abs(remaining) < 0.0004) {
          positionRef.current = target;
          paint();
          animationFrameRef.current = null;
          return;
        }

        positionRef.current += remaining * 0.16;
        paint();
        animationFrameRef.current = requestAnimationFrame(step);
      };

      animationFrameRef.current = requestAnimationFrame(step);
    },
    [indexAt, onActiveIndexChange, paint, total]
  );

  const goTo = useCallback(
    (index, notify = true) => {
      if (total === 0 || categoryTransitionPhase) return;
      const normalizedIndex = ((index % total) + total) % total;
      const target =
        normalizedIndex +
        Math.round((targetRef.current - normalizedIndex) / total) * total;
      settle(target, notify);
    },
    [categoryTransitionPhase, settle, total]
  );

  const nudge = useCallback(
    (by, resetTimer = true) => {
      if (total <= 1 || categoryTransitionPhase) return;
      settle(Math.round(targetRef.current) + by);
      if (resetTimer) setTimerKey((key) => key + 1);
    },
    [categoryTransitionPhase, settle, total]
  );

  // Reset the motion model only when the category supplies a new item set.
  useIsoLayoutEffect(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const nextIndex = total === 0
      ? 0
      : ((startingIndex % total) + total) % total;
    positionRef.current = nextIndex;
    targetRef.current = nextIndex;
    setSelected(nextIndex);
    cardRefs.current.length = total;
    paint();
  }, [items]);

  // Repaint before the browser draws whenever React updates active classes or
  // the existing category transition changes phase.
  useIsoLayoutEffect(() => {
    paint();
  }, [paint, selected]);

  // Accept controlled index changes that did not originate from this carousel.
  useEffect(() => {
    if (!isControlled || total === 0) return;
    const desired = ((controlledActiveIndex % total) + total) % total;
    if (indexAt(targetRef.current) === desired) return;
    goTo(desired, false);
  }, [controlledActiveIndex, goTo, indexAt, isControlled, total]);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    []
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof ResizeObserver === "undefined") return undefined;

    const measure = () => {
      const firstCard = cardRefs.current[0];
      if (!firstCard) return;
      widthRef.current = firstCard.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => {
    if (isDragging || categoryTransitionPhase || total <= 1) return undefined;
    const timer = window.setInterval(() => nudge(1, false), autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [
    autoPlayInterval,
    categoryTransitionPhase,
    isDragging,
    nudge,
    timerKey,
    total
  ]);

  const onPointerDown = (event) => {
    if (categoryTransitionPhase || total <= 1) return;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    event.currentTarget.setPointerCapture?.(event.pointerId);
    targetRef.current = positionRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      position: positionRef.current,
      velocity: 0,
      time: performance.now()
    };
    setIsDragging(true);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const width = widthRef.current || 340;
    const pitch = width * 1.08;
    const now = performance.now();
    const previous = positionRef.current;
    positionRef.current = drag.position - (event.clientX - drag.x) / pitch;
    drag.velocity =
      ((positionRef.current - previous) / Math.max(now - drag.time, 1)) * 1000;
    drag.time = now;

    const nextIndex = indexAt(positionRef.current);
    if (nextIndex !== selected) setSelected(nextIndex);
    paint();
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    dragRef.current = null;
    setIsDragging(false);
    const carried = Math.max(-2, Math.min(2, drag.velocity * 0.18));
    settle(Math.round(positionRef.current + carried));
    setTimerKey((key) => key + 1);
  };

  if (total === 0) return null;

  return (
    <div
      className={`circular-carousel-wrapper ${className}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          nudge(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          nudge(1);
        }
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Horizontal certificate Coverflow. Use the left and right arrow keys to navigate."
    >
      <div
        ref={frameRef}
        className="circular-carousel-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="circular-carousel-deck">
          {items.map((item, index) => {
            const isActive = index === selected;

            return (
              <div
                key={`${item.title || index}-${index}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={`circular-carousel-card ${isActive ? "is-active" : ""} ${isDragging ? "is-dragging" : ""} ${categoryTransitionPhase ? "is-category-transition" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
                onClick={() => {
                  goTo(index);
                  setTimerKey((key) => key + 1);
                }}
              >
                {renderItem ? (
                  renderItem(item, { isActive, index })
                ) : (
                  <div className="circular-default-card">
                    <h4>{item.title}</h4>
                    <p>{item.location}</p>
                    <small>{item.date}</small>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
