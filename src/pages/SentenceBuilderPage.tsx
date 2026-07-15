import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { esSentences } from "../data/sentenceExercises/es";
import { frSentences } from "../data/sentenceExercises/fr";
import { laSentences } from "../data/sentenceExercises/la";
import { SentenceBuilder } from "../components/SentenceBuilder";
import type { SentenceExercise } from "../types";

const SENTENCES_BY_LANGUAGE: Record<string, SentenceExercise[]> = {
  es: esSentences,
  fr: frSentences,
  la: laSentences,
};

export function SentenceBuilderPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const [index, setIndex] = useState(0);
  if (!language) return <Navigate to="/" replace />;

  const exercises = SENTENCES_BY_LANGUAGE[languageId] ?? [];
  const exercise = exercises[index % exercises.length];

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Sentence Building</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Sentence {(index % exercises.length) + 1} of {exercises.length}
      </p>

      <div className="mt-8">
        {exercise ? (
          <SentenceBuilder key={exercise.id} exercise={exercise} glowColor={language.glowColor} onNext={() => setIndex((i) => i + 1)} />
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400">No exercises yet for {language.name}.</p>
        )}
      </div>
    </div>
  );
}
