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
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">{lesson.title}</h1>
      <p className="mt-1 text-muted-foreground">{lesson.description}</p>
      {!language.sttSupported && (
        <p className="mt-2 text-xs text-muted-foreground">
          Speaking practice isn't available for {language.name} in most browsers — playback still works.
        </p>
      )}

      <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {lesson.vocab.map((card) => (
          <VocabRow key={card.id} card={card} speechLang={language.speechLang} sttSupported={language.sttSupported} />
        ))}
      </div>
    </div>
  );
}
