import { useEffect, useState } from "react";

/** Eases a number from 0 to `target` over `durationMs`. When `enabled` is
 * false (e.g. prefers-reduced-motion), jumps straight to `target`. */
export function useCountUp(target: number, durationMs: number, enabled: boolean): number {
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs, enabled]);

  return value;
}
