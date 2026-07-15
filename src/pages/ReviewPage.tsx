import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getAllVocab } from "../data/languages";
import { Flashcard } from "../components/Flashcard";
import { getAllCardStates, getCardState, setCardState } from "../lib/storage";
import { isDue, nextState } from "../lib/srs";
import { awardReviewXp } from "../lib/gamification";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import type { SrsGrade } from "../types";

export function ReviewPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const { user } = useAuth();
  const { pushEvents } = useToast();

  const initialQueue = useMemo(() => {
    if (!language) return [];
    const vocab = getAllVocab(language.id);
    const srsStates = getAllCardStates();
    return vocab.filter((card) => isDue(srsStates[card.id]));
  }, [language]);

  const [queue, setQueue] = useState(initialQueue);
  const [reviewedCount, setReviewedCount] = useState(0);

  if (!language) return <Navigate to="/" replace />;

  const currentCard = queue[0];

  const handleGrade = (grade: SrsGrade) => {
    const current = getCardState(currentCard.id);
    setCardState(currentCard.id, nextState(current, grade));
    pushEvents(awardReviewXp(user?.id ?? null, grade));
    setReviewedCount((c) => c + 1);
    setQueue((q) => q.slice(1));
  };

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Review · {language.name}</h1>

      <div className="mt-8">
        {currentCard ? (
          <>
            <p className="mb-4 text-center text-sm text-slate-400 dark:text-slate-500">
              {queue.length} card{queue.length === 1 ? "" : "s"} left
            </p>
            <Flashcard
              card={currentCard}
              glowColor={language.glowColor}
              speechLang={language.speechLang}
              onGrade={handleGrade}
            />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-lg font-semibold">
              {reviewedCount > 0 ? "All done for now! 🎉" : "Nothing due for review yet"}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {reviewedCount > 0
                ? `You reviewed ${reviewedCount} card${reviewedCount === 1 ? "" : "s"}.`
                : `Add vocab to lessons in src/data/lessons/${language.id}.ts, then come back here.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
