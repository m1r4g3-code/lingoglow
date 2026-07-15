import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { esConjugations } from "../data/conjugations/es";
import { frConjugations } from "../data/conjugations/fr";
import { ConjugationDrill } from "../components/ConjugationDrill";
import type { ConjugationEntry } from "../types";

const CONJUGATIONS_BY_LANGUAGE: Record<string, ConjugationEntry[]> = {
  es: esConjugations,
  fr: frConjugations,
};

export function ConjugationPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const entries = CONJUGATIONS_BY_LANGUAGE[languageId];

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Verb Conjugation Drills</h1>

      {!entries ? (
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Conjugation drills for {language.name} are coming soon — see the Grammar page for its conjugation patterns.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {entries.map((entry) => (
            <ConjugationDrill key={entry.infinitive} entry={entry} glowColor={language.glowColor} />
          ))}
        </div>
      )}
    </div>
  );
}
