import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { esConjugations } from "../data/conjugations/es";
import { frConjugations } from "../data/conjugations/fr";
import { deConjugations } from "../data/conjugations/de";
import { itConjugations } from "../data/conjugations/it";
import { arConjugations } from "../data/conjugations/ar";
import { nlConjugations } from "../data/conjugations/nl";
import { ruConjugations } from "../data/conjugations/ru";
import { elConjugations } from "../data/conjugations/el";
import { hiConjugations } from "../data/conjugations/hi";
import { ConjugationDrill } from "../components/ConjugationDrill";
import type { ConjugationEntry } from "../types";

// la/zh/yo/ha are deliberately absent: Latin's content set never included
// a conjugation drill, and Mandarin/Yoruba/Hausa don't inflect verbs by
// person the way this table assumes (see their grammar sheets for how
// each actually marks tense/aspect instead). Keep this map's keys in
// sync with src/data/conjugationLanguages.ts's CONJUGATION_LANGUAGE_IDS,
// which LanguagePage uses instead of this (heavy, lazy-loaded) map so its
// eager bundle doesn't pull in every language's conjugation data.
export const CONJUGATIONS_BY_LANGUAGE: Record<string, ConjugationEntry[]> = {
  es: esConjugations,
  fr: frConjugations,
  de: deConjugations,
  it: itConjugations,
  ar: arConjugations,
  nl: nlConjugations,
  ru: ruConjugations,
  el: elConjugations,
  hi: hiConjugations,
};

export function ConjugationPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const entries = CONJUGATIONS_BY_LANGUAGE[languageId];

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Verb Conjugation Drills</h1>

      {!entries ? (
        <p className="mt-4 text-muted-foreground">
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
