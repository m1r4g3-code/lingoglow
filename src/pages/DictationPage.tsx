import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getAllVocab } from "../data/languages";
import { DictationExercise } from "../components/DictationExercise";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function DictationPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const [index, setIndex] = useState(0);
  const deck = useMemo(() => shuffle(getAllVocab(languageId)).slice(0, 20), [languageId]);
  if (!language) return <Navigate to="/" replace />;

  const card = deck[index % deck.length];

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Dictation</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Word {(index % deck.length) + 1} of {deck.length}
      </p>

      {!language.speechLang || deck.length === 0 ? (
        <p className="mt-6 text-slate-500 dark:text-slate-400">No vocab available yet.</p>
      ) : (
        <div className="mt-8">
          <DictationExercise
            key={card.id}
            card={card}
            speechLang={language.speechLang}
            glowColor={language.glowColor}
            onNext={() => setIndex((i) => i + 1)}
          />
        </div>
      )}
    </div>
  );
}
