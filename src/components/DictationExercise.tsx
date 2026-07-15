import { useState } from "react";
import { Check, Volume2, X } from "lucide-react";
import type { VocabCard } from "../types";
import { isTTSSupported, isTextMatch, speak } from "../lib/speech";
import { useVoiceAvailable } from "../hooks/useVoiceAvailable";

interface DictationExerciseProps {
  card: VocabCard;
  speechLang: string;
  glowColor: string;
  onNext: () => void;
}

export function DictationExercise({ card, speechLang, glowColor, onNext }: DictationExerciseProps) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState<"idle" | "correct" | "incorrect">("idle");
  const voiceAvailable = useVoiceAvailable(speechLang);

  const handleListen = () => speak(card.front, speechLang);

  const handleCheck = () => {
    setChecked(isTextMatch(input, card.front) ? "correct" : "incorrect");
  };

  const handleNext = () => {
    setInput("");
    setChecked("idle");
    onNext();
  };

  if (isTTSSupported() && !voiceAvailable) {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Dictation needs spoken audio, and this language doesn't have a native voice available on your device yet.
        </p>
        <button
          type="button"
          onClick={onNext}
          className="brand-gradient-bg mt-5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
        >
          Skip word
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">Listen, then type what you hear ({card.back})</p>

      <button
        type="button"
        onClick={handleListen}
        disabled={!isTTSSupported()}
        className="glow-card mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        style={{ ["--glow-color" as string]: glowColor }}
      >
        <Volume2 className="h-8 w-8 text-slate-600 dark:text-slate-300" strokeWidth={1.5} />
      </button>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checked === "idle" && handleCheck()}
        placeholder="Type what you heard..."
        className={`glow-ring mt-5 w-full rounded-lg border px-4 py-2.5 text-center text-sm outline-none dark:bg-slate-900 ${
          checked === "correct"
            ? "border-emerald-400 dark:border-emerald-500"
            : checked === "incorrect"
              ? "border-rose-300 dark:border-rose-500"
              : "border-slate-200 dark:border-slate-700"
        }`}
      />

      {checked === "correct" && (
        <p className="mt-3 inline-flex items-center gap-1 font-semibold text-emerald-500">
          <Check className="h-4 w-4" strokeWidth={2} /> Correct! It was "{card.front}"
        </p>
      )}
      {checked === "incorrect" && (
        <p className="mt-3 inline-flex items-center gap-1 font-semibold text-rose-500">
          <X className="h-4 w-4" strokeWidth={2} /> Not quite — it was "{card.front}"
        </p>
      )}

      <div className="mt-5">
        {checked === "idle" ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={input.trim().length === 0}
            className="brand-gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            Check
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="brand-gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
          >
            Next word
          </button>
        )}
      </div>
    </div>
  );
}
