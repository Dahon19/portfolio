import { useRef, useState, useCallback } from "react";

export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  scale = 1.02,
  glare = true,
  style = {},
  onClick,
  ...rest
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glarePos: { x: 50, y: 50 },
    glareOpacity: 0
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = -(y - 0.5) * (maxTilt * 2);
      const tiltY = (x - 0.5) * (maxTilt * 2);

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        glarePos: { x: (x * 100).toFixed(1), y: (y * 100).toFixed(1) },
        glareOpacity: 0.22
      });
    },
    [maxTilt, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glarePos: { x: 50, y: 50 },
      glareOpacity: 0
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: tiltStyle.transform,
        transition: isHovered
          ? "transform 90ms ease-out"
          : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      {...rest}
    >
      {children}
      {glare && (
        <div
          className="tilt-card-glare"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle 360px at ${tiltStyle.glarePos.x}% ${tiltStyle.glarePos.y}%, rgba(255, 235, 170, 0.28) 0%, rgba(212, 175, 55, 0.12) 35%, transparent 70%)`,
            opacity: tiltStyle.glareOpacity,
            transition: "opacity 300ms ease"
          }}
        />
      )}
    </div>
  );
}
