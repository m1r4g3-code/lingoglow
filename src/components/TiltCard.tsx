import type { ReactNode, MouseEvent } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** Wraps children in a card that tilts subtly toward the cursor on hover.
 * A no-op wrapper (no listeners, no transform) under prefers-reduced-motion. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  if (reducedMotion) return <div className={className}>{children}</div>;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - bounds.left) / bounds.width);
    mouseY.set((e.clientY - bounds.top) / bounds.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <m.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </m.div>
  );
}
