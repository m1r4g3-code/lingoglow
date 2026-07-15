import { useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getAllVocab } from "../data/languages";
import { Flashcard } from "../components/Flashcard";
import { SessionCompleteScreen } from "../components/SessionCompleteScreen";
import { getAllCardStates, getCardState, getUserProgress, setCardState } from "../lib/storage";
import { isDue, nextState } from "../lib/srs";
import { awardReviewXp, xpForGrade } from "../lib/gamification";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import type { SrsGrade } from "../types";

// Cards never reviewed before are always technically "due" (see isDue), which
// would dump an entire fresh language's vocab (400+ cards) into one session.
// Genuine reviews (cards with real history) are never capped — only how many
// brand-new cards get introduced per sitting.
const NEW_CARD_BATCH_SIZE = 20;

export function ReviewPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const { user } = useAuth();
  const { pushEvents } = useToast();
  const startTimeRef = useRef(Date.now());

  const initialQueue = useMemo(() => {
    if (!language) return [];
    const vocab = getAllVocab(language.id);
    const srsStates = getAllCardStates();
    const due = vocab.filter((card) => isDue(srsStates[card.id]));
    const reviewCards = due.filter((card) => srsStates[card.id] !== undefined);
    const newCards = due.filter((card) => srsStates[card.id] === undefined);
    return [...reviewCards, ...newCards.slice(0, NEW_CARD_BATCH_SIZE)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const [queue, setQueue] = useState(initialQueue);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [gradeCounts, setGradeCounts] = useState<Record<SrsGrade, number>>({ again: 0, hard: 0, good: 0, easy: 0 });
  const sessionTotal = initialQueue.length;

  if (!language) return <Navigate to="/" replace />;

  const currentCard = queue[0];

  const handleGrade = (grade: SrsGrade) => {
    const current = getCardState(currentCard.id);
    setCardState(currentCard.id, nextState(current, grade));
    pushEvents(awardReviewXp(user?.id ?? null, grade));
    setGradeCounts((c) => ({ ...c, [grade]: c[grade] + 1 }));
    setReviewedCount((c) => c + 1);
    setQueue((q) => q.slice(1));
  };

  const sessionXp = (Object.keys(gradeCounts) as SrsGrade[]).reduce(
    (sum, grade) => sum + gradeCounts[grade] * xpForGrade(grade),
    0
  );
  const goodOrEasy = gradeCounts.good + gradeCounts.easy;
  const accuracyPct = reviewedCount === 0 ? 0 : Math.round((goodOrEasy / reviewedCount) * 100);

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Review · {language.name}</h1>

      <div className="mt-8">
        {currentCard ? (
          <>
            <div className="mx-auto mb-2 flex max-w-md items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <span>
                Card {reviewedCount + 1} of {sessionTotal}
              </span>
              <span>{queue.length} left</span>
            </div>
            <div className="mx-auto mb-4 h-1.5 max-w-md overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-violet-500 transition-all duration-300 ease-out"
                style={{ width: `${(reviewedCount / sessionTotal) * 100}%` }}
              />
            </div>
            <div key={currentCard.id} className="anim-fade-in">
              <Flashcard
                card={currentCard}
                glowColor={language.glowColor}
                speechLang={language.speechLang}
                onGrade={handleGrade}
              />
            </div>
          </>
        ) : reviewedCount > 0 ? (
          <SessionCompleteScreen
            languageId={language.id}
            languageName={language.name}
            glowColor={language.glowColor}
            xpEarned={sessionXp}
            wordsReviewed={reviewedCount}
            accuracyPct={accuracyPct}
            elapsedSeconds={Math.round((Date.now() - startTimeRef.current) / 1000)}
            streakCurrent={getUserProgress().streakCurrent}
            isSignedIn={!!user}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-lg font-semibold">Nothing due for review yet</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Add vocab to lessons in src/data/lessons/{language.id}.ts, then come back here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
