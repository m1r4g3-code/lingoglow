import { useState } from "react";
import type { SrsGrade, VocabCard } from "../types";
import { isTTSSupported, speak } from "../lib/speech";
import { useVoiceAvailable } from "../hooks/useVoiceAvailable";

interface FlashcardProps {
  card: VocabCard;
  glowColor: string;
  speechLang: string;
  onGrade: (grade: SrsGrade) => void;
}

const GRADES: { grade: SrsGrade; label: string; classes: string }[] = [
  { grade: "again", label: "Again", classes: "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:hover:bg-rose-500/25" },
  { grade: "hard", label: "Hard", classes: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:hover:bg-amber-500/25" },
  { grade: "good", label: "Good", classes: "bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:hover:bg-sky-500/25" },
  { grade: "easy", label: "Easy", classes: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25" },
];

export function Flashcard({ card, glowColor, speechLang, onGrade }: FlashcardProps) {
  const [revealed, setRevealed] = useState(false);
  const voiceAvailable = useVoiceAvailable(speechLang);

  const handleGrade = (grade: SrsGrade) => {
    onGrade(grade);
    setRevealed(false);
  };

  return (
    <div className="mx-auto max-w-md">
      <div
        className="glow-card relative flex h-56 w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center dark:border-slate-800 dark:bg-slate-900"
        style={{ ["--glow-color" as string]: glowColor }}
      >
        {isTTSSupported() && voiceAvailable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              speak(card.front, speechLang);
            }}
            aria-label={`Listen to ${card.front}`}
            className="glow-ring absolute top-3 right-3 rounded-full p-1.5 text-slate-400 hover:text-sky-500 dark:text-slate-500 dark:hover:text-sky-300"
          >
            🔊
          </button>
        )}
        {isTTSSupported() && !voiceAvailable && (
          <span
            className="absolute top-3 right-3 text-xs text-slate-400 dark:text-slate-500"
            title="Native audio not available for this language on your device"
          >
            🔇
          </span>
        )}
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className="flex flex-1 w-full flex-col items-center justify-center"
        >
          <span className="text-2xl font-semibold">{revealed ? card.back : card.front}</span>
          {card.notes && revealed && (
            <span className="mt-2 text-sm text-slate-500 dark:text-slate-400">{card.notes}</span>
          )}
          {!revealed && <span className="mt-4 text-xs text-slate-400 dark:text-slate-500">Tap to reveal</span>}
        </button>
      </div>

      {revealed && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {GRADES.map(({ grade, label, classes }) => (
            <button
              key={grade}
              type="button"
              onClick={() => handleGrade(grade)}
              className={`rounded-lg px-2 py-2 text-sm font-medium transition-colors ${classes}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
