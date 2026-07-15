import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getLessonsByLevel } from "../data/languages";
import { getAllCardStates } from "../lib/storage";
import { isLessonCleared } from "../lib/progress";
import { useAuth } from "../context/AuthContext";
import { LEVEL_LABELS } from "../data/languages";
import type { CefrLevel } from "../types";

export function CertificatePage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const { profile } = useAuth();
  if (!language || !profile) return <Navigate to="/" replace />;

  const states = getAllCardStates();
  const levelGroups = getLessonsByLevel(languageId);
  const completedLevels = levelGroups
    .filter((g) => g.lessons.every((lesson) => isLessonCleared(lesson, states)))
    .map((g) => g.level);

  const allLevels: CefrLevel[] = ["A1", "A2", "B1"];
  const fullCourseComplete = allLevels.every((l) => completedLevels.includes(l)) && levelGroups.length === allLevels.length;

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Certificates</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400 print:hidden">
        Clear every word in a level's lessons to unlock its certificate.
      </p>

      {completedLevels.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400 print:hidden">
          No certificates yet — keep reviewing! Check your{" "}
          <Link to={`/language/${language.id}/skill-tree`} className="text-violet-500 hover:underline">
            skill tree
          </Link>{" "}
          to see what's left.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-8">
          {fullCourseComplete && (
            <Certificate title={`${language.name} — Full Course`} name={profile.username} glowColor={language.glowColor} />
          )}
          {completedLevels.map((level) => (
            <Certificate
              key={level}
              title={`${language.name} — ${LEVEL_LABELS[level]} (${level})`}
              name={profile.username}
              glowColor={language.glowColor}
            />
          ))}
        </div>
      )}

      {completedLevels.length > 0 && (
        <button
          type="button"
          onClick={() => window.print()}
          className="mt-6 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white print:hidden"
        >
          Print / Save as PDF
        </button>
      )}
    </div>
  );
}

function Certificate({ title, name, glowColor }: { title: string; name: string; glowColor: string }) {
  return (
    <div
      className="glow-card mx-auto w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900"
      style={{ ["--glow-color" as string]: glowColor }}
    >
      <p className="text-xs tracking-[0.3em] text-slate-400 uppercase dark:text-slate-500">Certificate of Completion</p>
      <h2 className="glow-text mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">This certifies that</p>
      <p className="mt-1 text-xl font-semibold">{name}</p>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">has successfully completed this curriculum on</p>
      <p className="mt-1 text-sm font-medium">
        {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <p className="mt-8 text-lg font-bold tracking-tight">Aether</p>
    </div>
  );
}
