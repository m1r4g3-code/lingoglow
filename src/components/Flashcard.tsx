import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
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

// Brief pause after a grade is tapped so the feedback animation actually
// registers before the next card swaps in — short enough to not read as lag.
const FEEDBACK_DELAY_MS = 220;

const FLASH_CLASSES: Record<SrsGrade, string> = {
  again: "ring-2 ring-rose-400 dark:ring-rose-500 anim-shake",
  hard: "ring-2 ring-amber-400 dark:ring-amber-500 anim-pop",
  good: "ring-2 ring-sky-400 dark:ring-sky-500 anim-pop",
  easy: "ring-2 ring-emerald-400 dark:ring-emerald-500 anim-pop",
};

export function Flashcard({ card, glowColor, speechLang, onGrade }: FlashcardProps) {
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<SrsGrade | null>(null);
  const voiceAvailable = useVoiceAvailable(speechLang);

  const handleGrade = (grade: SrsGrade) => {
    if (feedback) return;
    setFeedback(grade);
    setTimeout(() => {
      onGrade(grade);
      setRevealed(false);
      setFeedback(null);
    }, FEEDBACK_DELAY_MS);
  };

  return (
    <div className="mx-auto max-w-md">
      <div
        className={`glow-card relative flex h-56 w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center dark:border-slate-800 dark:bg-slate-900 ${
          feedback ? FLASH_CLASSES[feedback] : ""
        }`}
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
            className="glow-ring absolute top-3 right-3 rounded-full p-1.5 text-slate-400 hover:text-violet-500 dark:text-slate-500 dark:hover:text-violet-300"
          >
            <Volume2 className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )}
        {isTTSSupported() && !voiceAvailable && (
          <span
            className="absolute top-3 right-3 text-slate-300 dark:text-slate-600"
            title="Native audio not available for this language on your device"
          >
            <VolumeX className="h-4 w-4" strokeWidth={1.75} />
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
              disabled={feedback !== null}
              className={`rounded-lg px-2 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${classes} ${
                feedback === grade ? "anim-pop" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
