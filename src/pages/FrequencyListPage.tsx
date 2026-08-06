import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getVocabWithMeta } from "../data/languages";
import { VocabRow } from "../components/VocabRow";

export function FrequencyListPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const vocab = getVocabWithMeta(languageId)
    .slice()
    .sort((a, b) => a.frequencyRank - b.frequencyRank)
    .slice(0, 100);

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Most Common Words</h1>
      <p className="mt-1 text-muted-foreground">
        The first 100 words, ranked by teaching order — the words you'll use most, first.
      </p>

      <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {vocab.map((card) => (
          <VocabRow key={card.id} card={card} speechLang={language.speechLang} sttSupported={language.sttSupported} />
        ))}
      </div>
    </div>
  );
}
