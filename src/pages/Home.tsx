import { Link } from "react-router-dom";
import { Brain, Flame, Lock, Mic, Users, type LucideIcon } from "lucide-react";
import { languages, getLessons, getAllVocab } from "../data/languages";
import { LanguageCard } from "../components/LanguageCard";
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";
import { useAuth } from "../context/AuthContext";
import { buttonVariants } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const FEATURES: { icon: LucideIcon; title: string; description: string; to: string; requiresAuth: boolean }[] = [
  {
    icon: Brain,
    title: "Spaced Repetition",
    description: "A review system that resurfaces words right before you'd forget them.",
    to: "#languages",
    requiresAuth: false,
  },
  {
    icon: Mic,
    title: "Speech Practice",
    description: "Listen to native pronunciation and practice speaking with instant feedback.",
    to: "#languages",
    requiresAuth: false,
  },
  {
    icon: Flame,
    title: "Gamification",
    description: "XP, streaks, badges, missions, and a leaderboard to keep you coming back.",
    to: "/progress",
    requiresAuth: true,
  },
  {
    icon: Users,
    title: "Friends & Groups",
    description: "Add friends, join study groups, and learn alongside other people.",
    to: "/friends",
    requiresAuth: true,
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
        <h1 className="font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">Aether</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Learn languages that actually stick — spaced repetition, real speech practice, and a
          curriculum built to be finished, not just started.
        </p>
        {!user && (
          <div className="mt-9 flex flex-col items-center justify-center gap-3">
            {/* Links styled with buttonVariants directly, not <Button render=...> —
                Base UI's Button enforces button semantics and its own docs say not
                to render links through it; see @base-ui/react button.md. */}
            <a href="#languages" className={buttonVariants({ size: "lg", className: "h-auto px-8 py-3.5 text-base" })}>
              Start learning free
            </a>
            <Link to="/login" className={buttonVariants({ variant: "link", size: "sm", className: "text-muted-foreground" })}>
              Already know what you want? Create an account
            </Link>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-10 text-sm text-muted-foreground">
          <div>
            <p className="text-2xl font-bold text-foreground">{languages.length}</p>
            <p>Languages</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalLessons}</p>
            <p>Lessons</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{totalVocab}+</p>
            <p>Words & phrases</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => {
          const lockedForGuest = f.requiresAuth && !user;
          const inner = (
            <CardContent>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="font-heading mt-3 font-semibold text-card-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                {lockedForGuest ? (
                  <>
                    <Lock className="h-3 w-3" strokeWidth={2} /> Sign in to unlock
                  </>
                ) : f.to.startsWith("#") ? (
                  "Pick a language →"
                ) : (
                  "Open →"
                )}
              </p>
            </CardContent>
          );
          const cardClasses = "transition-all hover:-translate-y-0.5 hover:ring-primary/40";
          return f.to.startsWith("#") ? (
            <a key={f.title} href={f.to} className="block">
              <Card className={cardClasses}>{inner}</Card>
            </a>
          ) : (
            <Link key={f.title} to={f.to} className="block">
              <Card className={cardClasses}>{inner}</Card>
            </Link>
          );
        })}
      </div>

      {/* Language picker */}
      <div id="languages" className="mt-16 scroll-mt-20">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">Choose your language</h2>
        <p className="mt-1 text-muted-foreground">
          Work through lessons, then review with spaced-repetition flashcards.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {languages.map((language) => {
            const vocab = getAllVocab(language.id);
            const started = vocab.some((card) => srsStates[card.id] !== undefined);
            const dueCount = vocab.filter((card) => isDue(srsStates[card.id])).length;
            return (
              <LanguageCard
                key={language.id}
                language={language}
                lessonCount={getLessons(language.id).length}
                dueCount={dueCount}
                started={started}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
