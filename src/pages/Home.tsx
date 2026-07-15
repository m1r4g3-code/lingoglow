import { Link } from "react-router-dom";
import { languages, getLessons, getAllVocab } from "../data/languages";
import { LanguageCard } from "../components/LanguageCard";
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";

const FEATURES = [
  {
    icon: "🧠",
    title: "Spaced Repetition",
    description: "A review system that resurfaces words right before you'd forget them.",
    glowColor: "rgba(56, 189, 248, 0.35)",
  },
  {
    icon: "🎙️",
    title: "Speech Practice",
    description: "Listen to native pronunciation and practice speaking with instant feedback.",
    glowColor: "rgba(244, 114, 182, 0.35)",
  },
  {
    icon: "🔥",
    title: "Gamification",
    description: "XP, streaks, badges, missions, and a leaderboard to keep you coming back.",
    glowColor: "rgba(251, 146, 60, 0.35)",
  },
  {
    icon: "👥",
    title: "Friends & Groups",
    description: "Add friends, join study groups, and learn alongside other people.",
    glowColor: "rgba(192, 132, 252, 0.35)",
  },
];

export function Home() {
  const srsStates = getAllCardStates();
  const totalLessons = languages.reduce((sum, l) => sum + getLessons(l.id).length, 0);
  const totalVocab = languages.reduce((sum, l) => sum + getAllVocab(l.id).length, 0);

  return (
    <div>
      {/* Hero */}
      <div className="py-10 text-center sm:py-16">
        <h1 className="glow-text text-5xl font-extrabold tracking-tight sm:text-6xl">Aether</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
          Learn languages that actually stick — spaced repetition, real speech practice, and a
          curriculum built to be finished, not just started.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#languages"
            className="glow-card rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold dark:border-slate-800 dark:bg-slate-900"
            style={{ ["--glow-color" as string]: "rgba(56, 189, 248, 0.45)" }}
          >
            Start learning free
          </a>
          <Link
            to="/login"
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-300"
          >
            Create an account
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
          <div>
            <p className="glow-text text-2xl font-bold text-slate-800 dark:text-slate-100">{languages.length}</p>
            <p>Languages</p>
          </div>
          <div>
            <p className="glow-text text-2xl font-bold text-slate-800 dark:text-slate-100">{totalLessons}</p>
            <p>Lessons</p>
          </div>
          <div>
            <p className="glow-text text-2xl font-bold text-slate-800 dark:text-slate-100">{totalVocab}+</p>
            <p>Words & phrases</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="glow-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            style={{ ["--glow-color" as string]: f.glowColor }}
          >
            <span className="text-2xl">{f.icon}</span>
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Language picker */}
      <div id="languages" className="mt-16 scroll-mt-20">
        <h2 className="glow-text text-2xl font-bold tracking-tight">Choose your language</h2>
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
