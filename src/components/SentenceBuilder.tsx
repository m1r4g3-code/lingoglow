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
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">Build the sentence:</p>
      <p className="mt-1 text-center text-lg font-semibold">{exercise.prompt}</p>

      <div
        className="glow-card mt-5 flex min-h-16 flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
        style={{ ["--glow-color" as string]: glowColor }}
      >
        {picked.length === 0 && <span className="text-sm text-slate-400 dark:text-slate-500">Tap words below…</span>}
        {picked.map((word, i) => (
          <button
            key={`${word}-${i}`}
            type="button"
            onClick={() => removePicked(i)}
            className="rounded-lg bg-sky-100 px-3 py-1.5 text-sm font-medium text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
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
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium dark:border-slate-700 dark:bg-slate-800"
          >
            {word}
          </button>
        ))}
      </div>

      {checked === "correct" && <p className="mt-4 text-center font-semibold text-emerald-500">✓ Correct!</p>}
      {checked === "incorrect" && <p className="mt-4 text-center font-semibold text-rose-500">Not quite — try again.</p>}

      <div className="mt-5 flex justify-center gap-2">
        {checked === "correct" ? (
          <button type="button" onClick={reset} className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white">
            Next sentence
          </button>
        ) : (
          <button
            type="button"
            onClick={check}
            disabled={picked.length === 0}
            className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            Check
          </button>
        )}
      </div>
    </div>
  );
}
