import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
}

const COLORS = ["#8b5cf6", "#22d3ee", "#a78bfa", "#67e8f9", "#c084fc"];
const DURATION_MS = 900;

/** Short (<1s), canvas-based confetti burst — no animation library. Caller
 * is responsible for not rendering this at all under prefers-reduced-motion. */
export function ConfettiBurst({ onDone }: { onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: 60 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 6;
      return {
        x: width / 2,
        y: height / 2.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 4 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
      };
    });

    let raf = 0;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      ctx!.clearRect(0, 0, width, height);
      const fade = Math.max(0, 1 - elapsed / DURATION_MS);
      for (const p of particles) {
        p.vy += 0.15;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        ctx!.save();
        ctx!.globalAlpha = fade;
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx!.restore();
      }
      if (elapsed < DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        onDoneRef.current?.();
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
