import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getVocabByCategory } from "../data/languages";
import { VocabRow } from "../components/VocabRow";
import type { VocabCategory } from "../types";

const CATEGORIES: { value: VocabCategory; label: string }[] = [
  { value: "idiom", label: "Idioms" },
  { value: "slang", label: "Slang" },
  { value: "business", label: "Business" },
  { value: "travel", label: "Travel" },
  { value: "medical", label: "Medical" },
  { value: "general", label: "General" },
];

export function CategoryPage() {
  const { languageId = "", category = "general" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const vocab = getVocabByCategory(languageId, category as VocabCategory);

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Vocab Categories</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            to={`/language/${languageId}/category/${c.value}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              category === c.value
                ? "bg-violet-500 text-white"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {vocab.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No words tagged in this category yet.
        </div>
      ) : (
        <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {vocab.map((card) => (
            <VocabRow key={card.id} card={card} speechLang={language.speechLang} sttSupported={language.sttSupported} />
          ))}
        </div>
      )}
    </div>
  );
}
