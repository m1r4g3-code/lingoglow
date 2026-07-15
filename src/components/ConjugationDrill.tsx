import { useState } from "react";
import type { ConjugationEntry } from "../types";
import { normalize } from "../lib/speech";

interface ConjugationDrillProps {
  entry: ConjugationEntry;
  glowColor: string;
}

export function ConjugationDrill({ entry, glowColor }: ConjugationDrillProps) {
  const [answers, setAnswers] = useState<string[]>(entry.forms.map(() => ""));
  const [checked, setChecked] = useState(false);

  const setAnswer = (i: number, value: string) => {
    setAnswers((a) => a.map((x, idx) => (idx === i ? value : x)));
    setChecked(false);
  };

  const isCorrect = (i: number) => normalize(answers[i]) === normalize(entry.forms[i].form);

  return (
    <div
      className="glow-card rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
      style={{ ["--glow-color" as string]: glowColor }}
    >
      <h3 className="font-semibold">
        {entry.infinitive} <span className="font-normal text-slate-500 dark:text-slate-400">— {entry.translation}</span>
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500">{entry.tense} tense</p>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {entry.forms.map((f, i) => (
          <div key={f.pronoun} className="flex items-center gap-2">
            <span className="w-28 shrink-0 text-sm text-slate-500 dark:text-slate-400">{f.pronoun}</span>
            <input
              value={answers[i]}
              onChange={(e) => setAnswer(i, e.target.value)}
              placeholder="..."
              className={`glow-ring w-full rounded-lg border px-3 py-1.5 text-sm outline-none dark:bg-slate-800 ${
                checked
                  ? isCorrect(i)
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10"
                    : "border-rose-300 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10"
                  : "border-slate-200 bg-white dark:border-slate-700"
              }`}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setChecked(true)}
        className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white"
      >
        Check
      </button>
      {checked && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {entry.forms.filter((_, i) => isCorrect(i)).length} / {entry.forms.length} correct
        </p>
      )}
    </div>
  );
}
