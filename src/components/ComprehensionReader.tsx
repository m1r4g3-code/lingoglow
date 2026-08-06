import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import type { ComprehensionPassage } from "../types";
import { isTTSSupported, speak } from "../lib/speech";
import { useVoiceAvailable } from "../hooks/useVoiceAvailable";

interface ComprehensionReaderProps {
  passage: ComprehensionPassage;
  speechLang: string;
  glowColor: string;
}

export function ComprehensionReader({ passage, speechLang, glowColor }: ComprehensionReaderProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(passage.questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const voiceAvailable = useVoiceAvailable(speechLang);

  const selectAnswer = (qIndex: number, choiceIndex: number) => {
    setAnswers((a) => a.map((x, i) => (i === qIndex ? choiceIndex : x)));
    setChecked(false);
  };

  const score = answers.filter((a, i) => a === passage.questions[i].correctIndex).length;

  return (
    <div
      className="glow-card rounded-2xl border border-border bg-card p-6"
      style={{ ["--glow-color" as string]: glowColor }}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{passage.title}</h2>
        {isTTSSupported() && voiceAvailable && (
          <button
            type="button"
            onClick={() => speak(passage.text, speechLang)}
            aria-label="Listen to passage"
            className="glow-ring rounded-full p-1 text-muted-foreground hover:text-primary"
          >
            <Volume2 className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )}
        {isTTSSupported() && !voiceAvailable && (
          <span
            className="inline-flex items-center gap-1 text-xs text-muted-foreground"
            title="Native audio not available for this language on your device"
          >
            <VolumeX className="h-3.5 w-3.5" strokeWidth={1.75} /> audio unavailable
          </span>
        )}
      </div>
      <p className="mt-3 leading-relaxed text-foreground" dir="auto">{passage.text}</p>

      <div className="mt-5 flex flex-col gap-4">
        {passage.questions.map((q, qi) => (
          <div key={q.prompt}>
            <p className="text-sm font-medium" dir="auto">{q.prompt}</p>
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
                    dir="auto"
                    className={`rounded-lg border px-3 py-2 text-left text-sm ${
                      isRight
                        ? "anim-pop border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10"
                        : isWrong
                          ? "anim-shake border-rose-300 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10"
                          : selected
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card"
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
        className="brand-gradient-bg mt-5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        Check answers
      </button>
      {checked && (
        <p className="mt-2 text-sm text-muted-foreground">
          {score} / {passage.questions.length} correct
        </p>
      )}
    </div>
  );
}
