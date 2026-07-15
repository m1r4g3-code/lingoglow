import { Link } from "react-router-dom";
import { CircleCheck, Lock, Star } from "lucide-react";
import type { Lesson } from "../types";

interface SkillTreeNodeProps {
  lesson: Lesson;
  languageId: string;
  glowColor: string;
  status: "cleared" | "unlocked" | "locked";
}

export function SkillTreeNode({ lesson, languageId, glowColor, status }: SkillTreeNodeProps) {
  const locked = status === "locked";

  const content = (
    <div
      className={`glow-card flex items-center gap-3 rounded-xl border p-4 ${
        locked
          ? "border-slate-200 bg-slate-100 opacity-60 dark:border-slate-800 dark:bg-slate-900/50"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
      style={locked ? undefined : { ["--glow-color" as string]: glowColor }}
    >
      {status === "cleared" ? (
        <CircleCheck className="h-5 w-5 shrink-0 text-emerald-500" strokeWidth={1.75} />
      ) : locked ? (
        <Lock className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-600" strokeWidth={1.75} />
      ) : (
        <Star className="h-5 w-5 shrink-0 text-amber-400" strokeWidth={1.75} fill="currentColor" fillOpacity={0.2} />
      )}
      <div className="min-w-0">
        <p className="truncate font-medium">{lesson.title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {locked ? "Complete the previous lesson to unlock" : `${lesson.vocab.length} words`}
        </p>
      </div>
    </div>
  );

  if (locked) return content;

  return (
    <Link to={`/language/${languageId}/lesson/${lesson.id}`} className="block">
      {content}
    </Link>
  );
}
