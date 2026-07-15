import { useState } from "react";
import type { ComprehensionPassage } from "../types";
import { isTTSSupported, speak } from "../lib/speech";

interface ComprehensionReaderProps {
  passage: ComprehensionPassage;
  speechLang: string;
  glowColor: string;
}

export function ComprehensionReader({ passage, speechLang, glowColor }: ComprehensionReaderProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(passage.questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const selectAnswer = (qIndex: number, choiceIndex: number) => {
    setAnswers((a) => a.map((x, i) => (i === qIndex ? choiceIndex : x)));
    setChecked(false);
  };

  const score = answers.filter((a, i) => a === passage.questions[i].correctIndex).length;

  return (
    <div
      className="glow-card rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
      style={{ ["--glow-color" as string]: glowColor }}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{passage.title}</h2>
        {isTTSSupported() && (
          <button
            type="button"
            onClick={() => speak(passage.text, speechLang)}
            aria-label="Listen to passage"
            className="glow-ring rounded-full p-1 text-slate-400 hover:text-sky-500 dark:text-slate-500 dark:hover:text-sky-300"
          >
            🔊
          </button>
        )}
      </div>
      <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{passage.text}</p>

      <div className="mt-5 flex flex-col gap-4">
        {passage.questions.map((q, qi) => (
          <div key={q.prompt}>
            <p className="text-sm font-medium">{q.prompt}</p>
            <div className="mt-2 flex flex-col gap-1.5">
              {q.choices.map((choice, ci) => {
                const selected = answers[qi] === ci;
                const isRight = checked && ci === q.correctIndex;
                const isWrong = checked && selected && ci !== q.correctIndex;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => selectAnswer(qi, ci)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm ${
                      isRight
                        ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10"
                        : isWrong
                          ? "border-rose-300 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10"
                          : selected
                            ? "border-sky-400 bg-sky-50 dark:border-sky-500 dark:bg-sky-500/10"
                            : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setChecked(true)}
        disabled={answers.some((a) => a === null)}
        className="mt-5 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        Check answers
      </button>
      {checked && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {score} / {passage.questions.length} correct
        </p>
      )}
    </div>
  );
}
