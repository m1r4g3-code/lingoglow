import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { esSentences } from "../data/sentenceExercises/es";
import { frSentences } from "../data/sentenceExercises/fr";
import { laSentences } from "../data/sentenceExercises/la";
import { deSentences } from "../data/sentenceExercises/de";
import { itSentences } from "../data/sentenceExercises/it";
import { arSentences } from "../data/sentenceExercises/ar";
import { zhSentences } from "../data/sentenceExercises/zh";
import { nlSentences } from "../data/sentenceExercises/nl";
import { yoSentences } from "../data/sentenceExercises/yo";
import { haSentences } from "../data/sentenceExercises/ha";
import { ruSentences } from "../data/sentenceExercises/ru";
import { elSentences } from "../data/sentenceExercises/el";
import { hiSentences } from "../data/sentenceExercises/hi";
import { SentenceBuilder } from "../components/SentenceBuilder";
import type { SentenceExercise } from "../types";

// Exported for the content-completeness test (see src/data/languages.test.ts).
export const SENTENCES_BY_LANGUAGE: Record<string, SentenceExercise[]> = {
  es: esSentences,
  fr: frSentences,
  la: laSentences,
  de: deSentences,
  it: itSentences,
  ar: arSentences,
  zh: zhSentences,
  nl: nlSentences,
  yo: yoSentences,
  ha: haSentences,
  ru: ruSentences,
  el: elSentences,
  hi: hiSentences,
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
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Sentence Building</h1>
      <p className="mt-1 text-muted-foreground">
        Sentence {(index % exercises.length) + 1} of {exercises.length}
      </p>

      <div className="mt-8">
        {exercise ? (
          <SentenceBuilder key={exercise.id} exercise={exercise} glowColor={language.glowColor} onNext={() => setIndex((i) => i + 1)} />
        ) : (
          <p className="text-center text-muted-foreground">No exercises yet for {language.name}.</p>
        )}
      </div>
    </div>
  );
}
