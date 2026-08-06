import { useEffect, useRef } from "react";
import { m, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Counts up to `value` once it scrolls into view. Renders the final
 * value immediately under prefers-reduced-motion. */
export function AnimatedCounter({ value, suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (!ref.current) return;
    if (reducedMotion) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [spring, reducedMotion, value, suffix]);

  return (
    <m.span ref={ref} className={className}>
      0{suffix}
    </m.span>
  );
}
