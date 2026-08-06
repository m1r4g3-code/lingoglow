import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Fades an element up into place the first time it scrolls into view.
 * A lightweight CSS/IntersectionObserver substitute for a scroll-animation
 * library — no extra dependency for what's fundamentally a one-shot
 * reveal. Fully inert (element just renders visible) under
 * prefers-reduced-motion. */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, className: visible ? "anim-fade-up" : "opacity-0" };
}
