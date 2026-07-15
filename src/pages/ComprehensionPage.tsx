import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { esComprehension } from "../data/comprehension/es";
import { frComprehension } from "../data/comprehension/fr";
import { laComprehension } from "../data/comprehension/la";
import { ComprehensionReader } from "../components/ComprehensionReader";
import type { ComprehensionPassage } from "../types";

const COMPREHENSION_BY_LANGUAGE: Record<string, ComprehensionPassage[]> = {
  es: esComprehension,
  fr: frComprehension,
  la: laComprehension,
};

export function ComprehensionPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const passages = COMPREHENSION_BY_LANGUAGE[languageId] ?? [];

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
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
