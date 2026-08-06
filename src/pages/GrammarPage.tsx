import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, LEVEL_LABELS } from "../data/languages";
import { esGrammar } from "../data/grammar/es";
import { frGrammar } from "../data/grammar/fr";
import { laGrammar } from "../data/grammar/la";
import { deGrammar } from "../data/grammar/de";
import { itGrammar } from "../data/grammar/it";
import { arGrammar } from "../data/grammar/ar";
import { zhGrammar } from "../data/grammar/zh";
import { nlGrammar } from "../data/grammar/nl";
import { yoGrammar } from "../data/grammar/yo";
import { haGrammar } from "../data/grammar/ha";
import { ruGrammar } from "../data/grammar/ru";
import { elGrammar } from "../data/grammar/el";
import { hiGrammar } from "../data/grammar/hi";
import type { GrammarSheet } from "../types";

// Exported for the content-completeness test (see src/data/languages.test.ts).
export const GRAMMAR_BY_LANGUAGE: Record<string, GrammarSheet[]> = {
  es: esGrammar,
  fr: frGrammar,
  la: laGrammar,
  de: deGrammar,
  it: itGrammar,
  ar: arGrammar,
  zh: zhGrammar,
  nl: nlGrammar,
  yo: yoGrammar,
  ha: haGrammar,
  ru: ruGrammar,
  el: elGrammar,
  hi: hiGrammar,
};

export function GrammarPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const sheets = GRAMMAR_BY_LANGUAGE[languageId] ?? [];

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Grammar Cheat Sheet</h1>

      {sheets.map((sheet) => (
        <div key={sheet.id} className="mt-8">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            {LEVEL_LABELS[sheet.level]} · {sheet.title}
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {sheet.sections.map((section) => (
              <div
                key={section.heading}
                className="glow-card rounded-xl border border-border bg-card p-5"
                style={{ ["--glow-color" as string]: language.glowColor }}
              >
                <h3 className="font-semibold">{section.heading}</h3>
                <p className="mt-1 text-sm text-foreground" dir="auto">{section.body}</p>
                <ul className="mt-2 space-y-1">
                  {section.examples.map((ex) => (
                    <li key={ex} className="text-sm text-muted-foreground" dir="auto">
                      • {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
