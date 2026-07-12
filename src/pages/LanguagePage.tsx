import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getLessonsByLevel, getAllVocab, LEVEL_LABELS } from "../data/languages";
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";

export function LanguagePage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const levelGroups = getLessonsByLevel(languageId);
  const totalLessons = levelGroups.reduce((sum, g) => sum + g.lessons.length, 0);
  const vocab = getAllVocab(languageId);
  const srsStates = getAllCardStates();
  const dueCount = vocab.filter((card) => isDue(srsStates[card.id])).length;

  return (
    <div>
      <Link to="/" className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← All languages
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <span
          className="glow-text flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-base font-bold tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          style={{ ["--glow-color" as string]: language.glowColor }}
        >
          {language.code}
        </span>
        <div>
          <h1 className="glow-text text-2xl font-bold">{language.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {language.nativeName} · {totalLessons} lessons
          </p>
        </div>
      </div>

      <Link
        to={`/language/${language.id}/review`}
        className="glow-card mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold dark:border-slate-800 dark:bg-slate-900"
        style={{ ["--glow-color" as string]: language.glowColor }}
      >
        Review flashcards
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {dueCount} due
        </span>
      </Link>

      {levelGroups.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No lessons yet for {language.name}. Add some in{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">
            src/data/lessons/{language.id}.ts
          </code>
        </div>
      ) : (
        levelGroups.map(({ level, lessons }) => (
          <div key={level} className="mt-10">
            <h2 className="mb-3 flex items-baseline gap-2 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
              {LEVEL_LABELS[level]}
              <span className="text-xs font-normal normal-case text-slate-400 dark:text-slate-600">{level}</span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/language/${language.id}/lesson/${lesson.id}`}
                  className="glow-card rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                  style={{ ["--glow-color" as string]: language.glowColor }}
                >
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lesson.description}</p>
                  <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{lesson.vocab.length} words</p>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
