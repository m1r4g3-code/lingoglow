import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  Bot,
  CheckCircle2,
  Ear,
  Flame,
  Layers,
  Lock,
  Map as MapIcon,
  Mic,
  Puzzle,
  Repeat2,
  Target,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { languages, getLessonsByLevel, getLessons, getAllVocab, LEVEL_LABELS } from "../data/languages";
import { LanguageCard } from "../components/LanguageCard";
import { ProgressRing } from "../components/ProgressRing";
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";
import { useAuth } from "../context/AuthContext";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { AI_FEATURES_ENABLED } from "../config";
import { buttonVariants } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const FEATURES: { icon: LucideIcon; title: string; description: string; comingSoon?: boolean }[] = [
  {
    icon: Bot,
    title: "AI Conversation Partner",
    description: "Practice real conversations with an AI partner that corrects mistakes gently, in the moment.",
    comingSoon: !AI_FEATURES_ENABLED,
  },
  {
    icon: Mic,
    title: "Speaking Practice",
    description: "Speak into your mic and get instant feedback on how close you are to native pronunciation.",
  },
  {
    icon: Ear,
    title: "Reading & Listening",
    description: "Short passages with native audio and comprehension questions, leveled to where you are.",
  },
  {
    icon: BookOpen,
    title: "Vocabulary Builder",
    description: "Thousands of words organized by lesson, frequency, and category — not just an alphabetical list.",
  },
  {
    icon: Layers,
    title: "Grammar Cheat Sheets",
    description: "Clear, no-nonsense grammar references for every language, from articles to verb conjugation.",
  },
  {
    icon: Target,
    title: "Daily Missions",
    description: "Daily and weekly challenges that reward focused practice with bonus XP and coins.",
  },
  {
    icon: Repeat2,
    title: "Spaced-Repetition Flashcards",
    description: "A review system that resurfaces words right before you'd naturally forget them.",
  },
  {
    icon: Puzzle,
    title: "Sentence Building",
    description: "Drag words into place to build real sentences — grammar you feel, not just memorize.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "XP, streaks, badges, and a leaderboard that make consistency visible and motivating.",
  },
  {
    icon: MapIcon,
    title: "Guided Skill Tree",
    description: "A learning path that unlocks new lessons as you clear the ones before them.",
  },
];

const HOW_IT_WORKS: { step: string; title: string; description: string; icon: LucideIcon }[] = [
  { step: "1", title: "Choose your language", description: "Pick from 13 languages, each with its own curriculum built from scratch.", icon: MapIcon },
  { step: "2", title: "Work the skill tree", description: "Start at the basics and unlock new lessons as you clear the ones before them.", icon: Layers },
  { step: "3", title: "Practice daily", description: "Flashcards, speaking, dictation, and sentence-building keep every session fresh.", icon: Target },
  { step: "4", title: "Track your progress", description: "Earn XP, keep your streak alive, and watch your fluency become visible.", icon: TrendingUp },
];

interface Testimonial {
  initial: string;
  role: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  { initial: "M", role: "Beginner, learning Spanish", quote: "The daily streak is what got me — I stopped dreading review sessions because they're actually quick." },
  { initial: "A", role: "Intermediate, learning French", quote: "Grammar finally clicked once I could see the cheat sheet right next to the drill instead of a separate textbook." },
  { initial: "K", role: "Beginner, learning German", quote: "Being able to hear a word and immediately try saying it back made the vocabulary stick way faster." },
];

interface FooterColumn {
  title: string;
  links: { label: string; href?: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Languages", href: "#languages" },
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "About" }, { label: "Blog" }, { label: "Careers" }],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy" }, { label: "Terms" }],
  },
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
      <h2 className="font-heading mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, className: revealClass } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${revealClass} ${className}`}>
      {children}
    </div>
  );
}

/** A stylized, in-app-data mockup for the hero — deliberately not a stock
 * photo or a fake device screenshot of a person; it's built from the same
 * design system as the rest of the app so it reads as authentic product UI. */
function HeroMockup() {
  return (
    <div className="glow-card relative mx-auto w-full max-w-sm rounded-3xl border border-border bg-card p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Flame className="h-4 w-4 text-amber-500" fill="currentColor" fillOpacity={0.2} strokeWidth={2} />7 day streak
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">Lv 6</span>
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-2xl bg-muted p-4">
        <ProgressRing percent={68} size={56} strokeWidth={5} />
        <div>
          <p className="text-xs text-muted-foreground">Today's XP</p>
          <p className="text-lg font-bold text-foreground">340 / 500</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border p-4">
        <p className="text-xs text-muted-foreground">Flashcard</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">Hablar</p>
        <p className="text-sm text-muted-foreground">to speak</p>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {["Again", "Hard", "Good", "Easy"].map((label) => (
            <span key={label} className="rounded-lg bg-secondary py-1.5 text-center text-[10px] font-medium text-secondary-foreground">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border p-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Mic className="h-4 w-4 text-primary" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">"Buenos días"</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">Nice pronunciation!</p>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const { user } = useAuth();
  const srsStates = getAllCardStates();
  const totalLessons = languages.reduce((sum, l) => sum + getLessons(l.id).length, 0);
  const totalVocab = languages.reduce((sum, l) => sum + getAllVocab(l.id).length, 0);

  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      {/* Hero */}
      <div className="relative overflow-hidden pt-8 pb-4 sm:pt-16">
        <div className="aurora-backdrop" aria-hidden="true" />
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn languages through <span className="brand-gradient-text">real conversations</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground lg:mx-0">
              Master speaking, listening, reading, and writing with spaced-repetition lessons, real speech practice,
              and a curriculum built to be finished, not just started.
            </p>
            {!user && (
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <a href="#languages" className={buttonVariants({ size: "lg", className: "h-auto px-8 py-3.5 text-base" })}>
                  Start learning free
                </a>
                <a href="#languages" className={buttonVariants({ variant: "outline", size: "lg", className: "h-auto px-8 py-3.5 text-base" })}>
                  Explore languages
                </a>
              </div>
            )}
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground lg:justify-start">
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
          <HeroMockup />
        </div>
      </div>

      {/* Language picker */}
      <div id="languages" className="scroll-mt-20">
        <SectionHeading eyebrow="13 languages" title="Choose your language" description="Work through lessons, then review with spaced-repetition flashcards." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {languages.map((language) => {
            const vocab = getAllVocab(language.id);
            const started = vocab.some((card) => srsStates[card.id] !== undefined);
            const dueCount = vocab.filter((card) => isDue(srsStates[card.id])).length;
            const levels = getLessonsByLevel(language.id).map((g) => g.level);
            const difficultyLabel =
              levels.length === 0 ? undefined : levels.length === 1 ? LEVEL_LABELS[levels[0]] : `${LEVEL_LABELS[levels[0]]} → ${LEVEL_LABELS[levels[levels.length - 1]]}`;
            return (
              <LanguageCard
                key={language.id}
                language={language}
                lessonCount={getLessons(language.id).length}
                dueCount={dueCount}
                started={started}
                difficultyLabel={difficultyLabel}
              />
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div id="features" className="scroll-mt-20">
        <SectionHeading eyebrow="Everything you need" title="Built for learners who want to finish" description="Not a vocabulary quiz app — a full curriculum with grammar, speech, and structure." />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Reveal key={f.title}>
              <Card className="glow-card h-full border-border transition-all hover:-translate-y-0.5 hover:ring-primary/40">
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <f.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </div>
                    {f.comingSoon && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground uppercase">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading mt-3 font-semibold text-card-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="scroll-mt-20">
        <SectionHeading eyebrow="Getting started" title="How it works" />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.step} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-sm font-semibold text-primary">Step {s.step}</p>
              <h3 className="font-heading mt-1 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="absolute top-7 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-border lg:block" aria-hidden="true" />
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Progress showcase */}
      <div>
        <SectionHeading eyebrow="Stay motivated" title="Progress you can actually see" description="Example of what your dashboard tracks once you're signed in." />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Weekly streak", value: "6 days", icon: Flame },
            { label: "Words learned", value: "482", icon: BookOpen },
            { label: "Speaking accuracy", value: "91%", icon: Mic },
            { label: "Lessons complete", value: "24", icon: CheckCircle2 },
            { label: "XP earned", value: "3,120", icon: TrendingUp },
            { label: "Badges", value: "9", icon: Award },
          ].map((stat) => (
            <div key={stat.label} className="glow-card rounded-2xl border border-border bg-card p-4 text-center">
              <stat.icon className="mx-auto h-5 w-5 text-primary" strokeWidth={1.75} />
              <p className="mt-2 text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <SectionHeading eyebrow="Illustrative examples" title="What learners are working toward" description="Aether is early — these are representative examples, not collected reviews yet." />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.role}>
              <Card className="glow-card h-full border-border">
                <CardContent>
                  <p className="text-sm text-foreground">"{t.quote}"</p>
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {t.initial}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.role}</span>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Community */}
      <div id="community" className="scroll-mt-20">
        <SectionHeading eyebrow="Learn together" title="You don't have to do this alone" description="Real features, not a chat mockup — add friends, join a study group, and see where you rank." />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Users, title: "Friends", description: "Add people you know and see each other's XP and streaks." },
            { icon: Users, title: "Study Groups", description: "Join a public group or start your own to share progress and posts." },
            { icon: Trophy, title: "Leaderboard", description: "See how your XP stacks up globally or against just your friends." },
          ].map((c) => (
            <div key={c.title} className="glow-card rounded-2xl border border-border bg-card p-6 text-center">
              <c.icon className="mx-auto h-6 w-6 text-primary" strokeWidth={1.75} />
              <h3 className="font-heading mt-3 font-semibold text-foreground">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div className="brand-gradient-bg rounded-3xl px-6 py-16 text-center sm:px-16">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Start speaking with confidence.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/90">
            Join learners building real-world language skills every day — free to start, no card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/login" className={buttonVariants({ size: "lg", className: "h-auto bg-white px-8 py-3.5 text-base text-primary hover:bg-white/90" })}>
              Get started free
            </Link>
            <Link
              to="/account"
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-auto border-white/40 bg-transparent px-8 py-3.5 text-base text-white hover:bg-white/10" })}
            >
              See Premium
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border pt-12 pb-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="brand-gradient-text text-lg font-bold">Aether</span>
            <p className="mt-2 text-sm text-muted-foreground">Language learning built to be finished.</p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label} className="flex items-center gap-1.5 text-sm text-muted-foreground/60">
                      {link.label}
                      <Lock className="h-3 w-3" strokeWidth={2} />
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted-foreground">© {new Date().getFullYear()} Aether. All rights reserved.</p>
      </footer>
    </div>
  );
}
