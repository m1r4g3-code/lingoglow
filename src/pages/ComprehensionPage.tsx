import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { esComprehension } from "../data/comprehension/es";
import { frComprehension } from "../data/comprehension/fr";
import { laComprehension } from "../data/comprehension/la";
import { deComprehension } from "../data/comprehension/de";
import { itComprehension } from "../data/comprehension/it";
import { arComprehension } from "../data/comprehension/ar";
import { zhComprehension } from "../data/comprehension/zh";
import { nlComprehension } from "../data/comprehension/nl";
import { yoComprehension } from "../data/comprehension/yo";
import { haComprehension } from "../data/comprehension/ha";
import { ruComprehension } from "../data/comprehension/ru";
import { elComprehension } from "../data/comprehension/el";
import { hiComprehension } from "../data/comprehension/hi";
import { ComprehensionReader } from "../components/ComprehensionReader";
import type { ComprehensionPassage } from "../types";

// Exported for the content-completeness test (see src/data/languages.test.ts).
export const COMPREHENSION_BY_LANGUAGE: Record<string, ComprehensionPassage[]> = {
  es: esComprehension,
  fr: frComprehension,
  la: laComprehension,
  de: deComprehension,
  it: itComprehension,
  ar: arComprehension,
  zh: zhComprehension,
  nl: nlComprehension,
  yo: yoComprehension,
  ha: haComprehension,
  ru: ruComprehension,
  el: elComprehension,
  hi: hiComprehension,
};

export function ComprehensionPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const passages = COMPREHENSION_BY_LANGUAGE[languageId] ?? [];

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Reading & Listening</h1>

      <div className="mt-6 flex flex-col gap-6">
        {passages.map((passage) => (
          <ComprehensionReader key={passage.id} passage={passage} speechLang={language.speechLang} glowColor={language.glowColor} />
        ))}
      </div>
    </div>
  );
}
