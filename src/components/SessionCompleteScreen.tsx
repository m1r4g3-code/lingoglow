import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { ConfettiBurst } from "./ConfettiBurst";
import { useCountUp } from "../hooks/useCountUp";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface SessionCompleteScreenProps {
  languageId: string;
  languageName: string;
  glowColor: string;
  xpEarned: number;
  wordsReviewed: number;
  accuracyPct: number;
  elapsedSeconds: number;
  streakCurrent: number;
  isSignedIn: boolean;
}

function formatElapsed(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function SessionCompleteScreen({
  languageId,
  languageName,
  glowColor,
  xpEarned,
  wordsReviewed,
  accuracyPct,
  elapsedSeconds,
  streakCurrent,
  isSignedIn,
}: SessionCompleteScreenProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [confettiDone, setConfettiDone] = useState(reducedMotion);
  const xpDisplay = useCountUp(xpEarned, 1200, !reducedMotion);
  const isPerfect = accuracyPct === 100 && wordsReviewed > 0;

  return (
    <div className="mx-auto max-w-md text-center">
      {!reducedMotion && !confettiDone && <ConfettiBurst onDone={() => setConfettiDone(true)} />}

      <div
        className={`glow-card rounded-2xl border p-8 ${
          isPerfect
            ? "border-amber-300 dark:border-amber-400/60"
            : "border-slate-200 dark:border-slate-800"
        } bg-white dark:bg-slate-900`}
        style={{ ["--glow-color" as string]: isPerfect ? "rgba(251, 191, 36, 0.45)" : glowColor }}
      >
        {isPerfect && (
          <p className="anim-pop mb-1 text-xs font-bold tracking-wide text-amber-500 uppercase">Perfect!</p>
        )}
        <p className="text-sm text-slate-500 dark:text-slate-400">Session complete</p>
        <p className="brand-gradient-text mt-1 text-5xl font-extrabold tabular-nums">+{xpDisplay} XP</p>

        {isSignedIn && streakCurrent > 0 && (
          <div className="anim-pop mt-4 flex items-center justify-center gap-1.5 text-amber-500">
            <Flame className="h-5 w-5" strokeWidth={2} fill="currentColor" fillOpacity={0.2} />
            <span className="font-semibold">{streakCurrent} day streak</span>
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-lg font-bold">{wordsReviewed}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Words</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-lg font-bold">{accuracyPct}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Accuracy</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-lg font-bold">{formatElapsed(elapsedSeconds)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Time</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Link
          to={`/language/${languageId}/review`}
          className="brand-gradient-bg w-full rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
        >
          Review more
        </Link>
        <Link
          to={`/language/${languageId}`}
          className="text-sm text-slate-500 hover:underline dark:text-slate-400"
        >
          Back to {languageName}
        </Link>
      </div>
    </div>
  );
}
