import { Link } from "react-router-dom";
import { Brain, Flame, Mic, Users, type LucideIcon } from "lucide-react";
import { languages, getLessons, getAllVocab } from "../data/languages";
import { LanguageCard } from "../components/LanguageCard";
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";
import { useAuth } from "../context/AuthContext";

const FEATURES: { icon: LucideIcon; title: string; description: string; to: string }[] = [
  {
    icon: Brain,
    title: "Spaced Repetition",
    description: "A review system that resurfaces words right before you'd forget them.",
    to: "#languages",
  },
  {
    icon: Mic,
    title: "Speech Practice",
    description: "Listen to native pronunciation and practice speaking with instant feedback.",
    to: "#languages",
  },
  {
    icon: Flame,
    title: "Gamification",
    description: "XP, streaks, badges, missions, and a leaderboard to keep you coming back.",
    to: "/progress",
  },
  {
    icon: Users,
    title: "Friends & Groups",
    description: "Add friends, join study groups, and learn alongside other people.",
    to: "/friends",
  },
];

export function Home() {
  const { user } = useAuth();
  const srsStates = getAllCardStates();
  const totalLessons = languages.reduce((sum, l) => sum + getLessons(l.id).length, 0);
  const totalVocab = languages.reduce((sum, l) => sum + getAllVocab(l.id).length, 0);

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden py-14 text-center sm:py-20">
        <div className="aurora-backdrop" aria-hidden="true" />
        <h1 className="brand-gradient-text text-5xl font-extrabold tracking-tight sm:text-7xl">Aether</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
          Learn languages that actually stick — spaced repetition, real speech practice, and a
          curriculum built to be finished, not just started.
        </p>
        {!user && (
          <div className="mt-9 flex items-center justify-center gap-3">
            <a
              href="#languages"
              className="brand-gradient-bg rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02]"
            >
              Start learning free
            </a>
            <Link
              to="/login"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700"
            >
              Create an account
            </Link>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-10 text-sm text-slate-500 dark:text-slate-400">
          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{languages.length}</p>
            <p>Languages</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalLessons}</p>
            <p>Lessons</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalVocab}+</p>
            <p>Words & phrases</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => {
          const cardClasses =
            "block rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-900";
          const inner = (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-500/10">
                <f.icon className="brand-icon h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.description}</p>
            </>
          );
          return f.to.startsWith("#") ? (
            <a key={f.title} href={f.to} className={cardClasses}>
              {inner}
            </a>
          ) : (
            <Link key={f.title} to={f.to} className={cardClasses}>
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Language picker */}
      <div id="languages" className="mt-16 scroll-mt-20">
        <h2 className="text-2xl font-bold tracking-tight">Choose your language</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Work through lessons, then review with spaced-repetition flashcards.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
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
    </div>
  );
}
