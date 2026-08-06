import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { getLanguage, getAllVocab } from "../data/languages";
import { getAllCardStates } from "../lib/storage";
import { isDifficult, masteryScore } from "../lib/srs";
import { VocabRow } from "../components/VocabRow";

type Tab = "favorites" | "difficult";

export function DifficultWordsPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const [tab, setTab] = useState<Tab>("favorites");
  if (!language) return <Navigate to="/" replace />;

  const vocab = getAllVocab(languageId);
  const states = getAllCardStates();

  const favorites = vocab.filter((card) => states[card.id]?.isFavorite);
  const difficult = vocab
    .filter((card) => isDifficult(states[card.id]))
    .sort((a, b) => masteryScore(states[a.id]) - masteryScore(states[b.id]));

  const shown = tab === "favorites" ? favorites : difficult;

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Favorites & Difficult Words</h1>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("favorites")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "favorites" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" strokeWidth={1.75} fill={tab === "favorites" ? "currentColor" : "none"} />
            Favorites ({favorites.length})
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab("difficult")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            tab === "difficult" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          }`}
        >
          Struggling with ({difficult.length})
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {tab === "favorites"
            ? "Tap the star next to any word in a lesson to save it here."
            : "Nothing here yet — words you keep missing during review will show up here."}
        </div>
      ) : (
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {shown.map((card) => (
            <VocabRow key={card.id} card={card} speechLang={language.speechLang} sttSupported={language.sttSupported} />
          ))}
        </div>
      )}
    </div>
  );
}
