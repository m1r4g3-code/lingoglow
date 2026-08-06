import { m, useReducedMotion } from "framer-motion";

interface FloatingWord {
  text: string;
  className: string;
  delay: number;
}

// A representative sample of real greetings from LingoGlow's actual
// language catalog (see src/data/languages.ts) — not arbitrary decoration.
const WORDS: FloatingWord[] = [
  { text: "Hola", className: "top-[8%] left-[2%] sm:left-[6%]", delay: 0 },
  { text: "Bonjour", className: "top-[62%] left-[0%] sm:left-[2%]", delay: 0.6 },
  { text: "こんにちは", className: "top-[20%] right-[0%] sm:right-[4%]", delay: 1.2 },
  { text: "안녕하세요", className: "top-[75%] right-[2%] sm:right-[8%]", delay: 0.3 },
  { text: "Ciao", className: "top-[42%] left-[10%] hidden sm:block", delay: 0.9 },
  { text: "Hallo", className: "top-[4%] right-[22%] hidden lg:block", delay: 1.5 },
];

/** Gently floating greeting cards scattered around the hero. Purely
 * decorative (aria-hidden) and inert under prefers-reduced-motion. */
export function FloatingLanguageCards() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {WORDS.map((word) => (
        <m.span
          key={word.text}
          className={`glow-card absolute rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm ${word.className}`}
          initial={{ opacity: 0, y: 12 }}
          animate={
            reducedMotion
              ? { opacity: 0.9, y: 0 }
              : { opacity: [0, 0.9, 0.9, 0], y: [12, -6, -6, -16] }
          }
          transition={
            reducedMotion
              ? { duration: 0.5, delay: word.delay }
              : { duration: 6, delay: word.delay, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {word.text}
        </m.span>
      ))}
    </div>
  );
}
