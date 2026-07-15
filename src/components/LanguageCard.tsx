import { Link } from "react-router-dom";
import type { Language } from "../types";

interface LanguageCardProps {
  language: Language;
  lessonCount: number;
  dueCount: number;
}

export function LanguageCard({ language, lessonCount, dueCount }: LanguageCardProps) {
  return (
    <Link
      to={`/language/${language.id}`}
      className="glow-card block rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
      style={{ ["--glow-color" as string]: language.glowColor }}
    >
      <div className="flex items-center justify-between">
        <span
          className="glow-text flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          style={{ ["--glow-color" as string]: language.glowColor }}
        >
          {language.code}
        </span>
        {dueCount > 0 && (
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            {dueCount} due
          </span>
        )}
      </div>
      <h3 className="glow-text mt-4 text-lg font-semibold">{language.name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{language.nativeName}</p>
      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
        {lessonCount === 0 ? "No lessons yet" : `${lessonCount} lesson${lessonCount === 1 ? "" : "s"}`}
      </p>
    </Link>
  );
}
