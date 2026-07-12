import { languages, getLessons, getAllVocab } from "../data/languages";
import { LanguageCard } from "../components/LanguageCard";
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";

export function Home() {
  const srsStates = getAllCardStates();

  return (
    <div>
      <div className="mb-10">
        <h1 className="glow-text text-3xl font-bold tracking-tight">Pick a language</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Work through lessons, then review with spaced-repetition flashcards.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {languages.map((language) => {
          const vocab = getAllVocab(language.id);
          const dueCount = vocab.filter((card) => isDue(srsStates[card.id])).length;
          return (
            <LanguageCard
              key={language.id}
              language={language}
              lessonCount={getLessons(language.id).length}
              dueCount={dueCount}
            />
          );
        })}
      </div>
    </div>
  );
}
