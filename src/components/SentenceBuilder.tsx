import { useMemo, useState } from "react";
import type { SentenceExercise } from "../types";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface SentenceBuilderProps {
  exercise: SentenceExercise;
  glowColor: string;
  onNext: () => void;
}

export function SentenceBuilder({ exercise, glowColor, onNext }: SentenceBuilderProps) {
  const bank = useMemo(() => shuffle(exercise.tokens), [exercise]);
  const [picked, setPicked] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<string[]>(bank);
  const [checked, setChecked] = useState<"idle" | "correct" | "incorrect">("idle");

  const pick = (word: string, index: number) => {
    setPicked((p) => [...p, word]);
    setRemaining((r) => r.filter((_, i) => i !== index));
  };

  const removePicked = (index: number) => {
    const word = picked[index];
    setPicked((p) => p.filter((_, i) => i !== index));
    setRemaining((r) => [...r, word]);
    setChecked("idle");
  };

  const check = () => {
    const isCorrect = picked.length === exercise.correctOrder.length && picked.every((w, i) => w === exercise.correctOrder[i]);
    setChecked(isCorrect ? "correct" : "incorrect");
  };

  const reset = () => {
    setPicked([]);
    setRemaining(bank);
    setChecked("idle");
    onNext();
  };

  return (
    <div className="mx-auto max-w-lg">
      <p className="text-center text-sm text-muted-foreground">Build the sentence:</p>
      <p className="mt-1 text-center text-lg font-semibold">{exercise.prompt}</p>

      <div
        className="glow-card mt-5 flex min-h-16 flex-wrap gap-2 rounded-xl border border-border bg-card p-3"
        style={{ ["--glow-color" as string]: glowColor }}
      >
        {picked.length === 0 && <span className="text-sm text-muted-foreground">Tap words below…</span>}
        {picked.map((word, i) => (
          <button
            key={`${word}-${i}`}
            type="button"
            onClick={() => removePicked(i)}
            className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {remaining.map((word, i) => (
          <button
            key={`${word}-${i}`}
            type="button"
            onClick={() => pick(word, i)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium"
          >
            {word}
          </button>
        ))}
      </div>

      {checked === "correct" && (
        <p className="anim-pop mt-4 text-center font-semibold text-emerald-500">✓ Correct!</p>
      )}
      {checked === "incorrect" && (
        <p className="anim-shake mt-4 text-center font-semibold text-rose-500">Not quite — try again.</p>
      )}

      <div className="mt-5 flex justify-center gap-2">
        {checked === "correct" ? (
          <button
            type="button"
            onClick={reset}
            className="brand-gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
          >
            Next sentence
          </button>
        ) : (
          <button
            type="button"
            onClick={check}
            disabled={picked.length === 0}
            className="brand-gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            Check
          </button>
        )}
      </div>
    </div>
  );
}
