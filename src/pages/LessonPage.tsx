import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getLesson } from "../data/languages";
import { VocabRow } from "../components/VocabRow";

export function LessonPage() {
  const { languageId = "", lessonId = "" } = useParams();
  const language = getLanguage(languageId);
  const lesson = getLesson(languageId, lessonId);
  if (!language || !lesson) return <Navigate to="/" replace />;

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">{lesson.title}</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">{lesson.description}</p>
      {!language.sttSupported && (
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          Speaking practice isn't available for {language.name} in most browsers — playback still works.
        </p>
      )}

      <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {lesson.vocab.map((card) => (
          <VocabRow key={card.id} card={card} speechLang={language.speechLang} sttSupported={language.sttSupported} />
        ))}
      </div>
    </div>
  );
}
