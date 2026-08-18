import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Option 1: Apple Keynote Fluid Arc Glide Carousel
 * Signature quintic deceleration easing, clean curved orbital arc trajectory, and seamless auto-rotation.
 */
export function CircularCarousel({
  items = [],
  renderItem,
  autoPlayInterval = 4200,
  className = ""
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const total = items.length;

  const next = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
    setTimerKey((k) => k + 1);
  }, [total]);

  const prev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimerKey((k) => k + 1);
  }, [total]);

  // Continuous auto-orbiting timer
  useEffect(() => {
    if (isDragging || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isDragging, total, autoPlayInterval, timerKey]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [next, prev]
  );

  // Pointer drag events
  const onPointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    setDragOffset(0);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -45) {
      next();
    } else if (dragOffset > 45) {
      prev();
    }
    setDragOffset(0);
  };

  if (total === 0) return null;

  return (
    <div
      className={`circular-carousel-wrapper ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Apple Keynote Fluid Arc Carousel"
    >
      {/* 3D Arc Stage Viewport */}
      <div
        className="circular-carousel-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Subtle Ambient Gold Spotlight */}
        <div className="circular-carousel-orbit-glow" aria-hidden="true" />

        {/* Glowing Orbital Arc SVG Guide */}
        <svg
          className="circular-carousel-arc-svg"
          viewBox="0 0 1000 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="appleKeynoteArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(212,175,55,0)" />
              <stop offset="18%" stopColor="rgba(212,175,55,0.35)" />
              <stop offset="50%" stopColor="rgba(212,175,55,0.8)" />
              <stop offset="82%" stopColor="rgba(212,175,55,0.35)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0)" />
            </linearGradient>
          </defs>
          <path
            d="M 70,250 Q 500,25 930,250"
            stroke="url(#appleKeynoteArcGrad)"
            strokeWidth="1.8"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Orbiting Items Deck */}
        <div className="circular-carousel-deck">
          {items.map((item, index) => {
            // Compute wrapped distance from activeIndex
            let diff = index - activeIndex;
            while (diff > total / 2) diff -= total;
            while (diff < -total / 2) diff += total;

            const absDiff = Math.abs(diff);

            // Interpolate dragging shift
            const dragShift = isDragging ? dragOffset * 0.75 : 0;

            // Apple Keynote Fluid Arc Kinematics
            const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
            const spacingX = isMobile ? 230 : 315;

            // X-Coordinate along the arc
            const x = diff * spacingX + dragShift;
            // Radial Y-drop curving downwards from apex
            const y = Math.pow(absDiff, 1.55) * (isMobile ? 30 : 40);
            // Tangential Z-tilt fanning out along the curvature
            const rotateZ = diff * (isMobile ? 7.5 : 9.5);
            // Inward 3D perspective tilt
            const rotateY = -diff * 11;
            // Smooth scaling from apex
            const scale = absDiff === 0 ? 1 : Math.max(0.72, 1 - absDiff * 0.12);

            // Smooth opacity falloff
            let opacity = 0;
            if (absDiff === 0) opacity = 1;
            else if (absDiff === 1) opacity = 0.65;
            else if (absDiff === 2) opacity = 0.22;
            else opacity = 0;

            const isVisible = absDiff <= 2;
            const zIndex = absDiff === 0 ? 30 : Math.max(1, 20 - Math.round(absDiff * 6));
            const isActive = diff === 0 && Math.abs(dragOffset) < 30;

            return (
              <div
                key={`${item.title || index}-${index}`}
                className={`circular-carousel-card ${isActive ? "is-active" : ""} ${isDragging ? "is-dragging" : ""}`}
                style={{
                  transform: `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px)) rotateZ(${rotateZ.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
                  opacity: opacity.toFixed(2),
                  zIndex,
                  pointerEvents: isVisible && absDiff <= 1 ? "auto" : "none",
                  visibility: opacity > 0.02 ? "visible" : "hidden"
                }}
                onClick={() => {
                  if (diff !== 0) {
                    setActiveIndex(index);
                    setTimerKey((k) => k + 1);
                  }
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

      {/* Minimalist Centered Navigation */}
      <div className="circular-carousel-controls">
        <div className="circular-carousel-nav">
          <button
            type="button"
            className="circular-nav-btn"
            onClick={prev}
            aria-label="Previous item"
            title="Previous"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="circular-counter">
            <span className="circular-counter-current">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="circular-counter-sep">/</span>
            <span className="circular-counter-total">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            className="circular-nav-btn"
            onClick={next}
            aria-label="Next item"
            title="Next"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
