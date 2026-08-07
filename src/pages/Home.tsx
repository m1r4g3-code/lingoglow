import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  Bot,
  CheckCircle2,
  Ear,
  Flame,
  GraduationCap,
  Layers,
  Lock,
  Map as MapIcon,
  Mic,
  Puzzle,
  Repeat2,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { languages, getLanguage, getLessonsByLevel, getLessons, getAllVocab, LEVEL_LABELS } from "../data/languages";
import { LanguageCard } from "../components/LanguageCard";
import { LogoMark } from "../components/LogoMark";
import { ProgressRing } from "../components/ProgressRing";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { FloatingLanguageCards } from "../components/FloatingLanguageCards";
import { TiltCard } from "../components/TiltCard";

// react-globe.gl pulls in three.js — kept out of the eager bundle entirely.
// This is the only lazy-loaded piece of an otherwise-eager page, so a
// loading skeleton (not a blank gap) covers the brief chunk fetch.
const LanguageGlobe = lazy(() => import("../components/LanguageGlobe"));
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";
import { useAuth } from "../context/AuthContext";
import { AI_FEATURES_ENABLED } from "../config";
import { buttonVariants } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
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
  { step: "1", title: "Discover a language", description: "Pick from 13 languages, each with its own curriculum built from scratch.", icon: MapIcon },
  { step: "2", title: "Work the skill tree", description: "Start at the basics and unlock new lessons as you clear the ones before them.", icon: Layers },
  { step: "3", title: "Build vocabulary", description: "Spaced-repetition flashcards resurface words right before you'd forget them.", icon: Repeat2 },
  { step: "4", title: "Learn the grammar", description: "Cheat sheets and sentence-building drills turn rules into instinct.", icon: BookOpen },
  { step: "5", title: "Practice speaking", description: "Listen to native audio, then speak it back and get instant feedback.", icon: Mic },
  { step: "6", title: "Track & earn", description: "XP, streaks, badges, and a certificate per level make progress visible.", icon: GraduationCap },
];

interface ProductScreen {
  title: string;
  comingSoon?: boolean;
  body: ReactNode;
}

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

// Real destinations only — no App Store/newsletter links, since neither
// a native app nor an email service actually exists yet.
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
    title: "Popular languages",
    links: [
      { label: "Spanish", href: "/language/es" },
      { label: "French", href: "/language/fr" },
      { label: "German", href: "/language/de" },
      { label: "Arabic", href: "/language/ar" },
      { label: "Mandarin", href: "/language/zh" },
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

/** Deterministic, real "word of the day": derived from the actual
 * per-language vocab data and today's date, so it's the same for every
 * visitor on a given day and genuinely changes tomorrow — not a
 * fabricated widget. */
function getWordOfTheDay() {
  const pool = ["es", "fr", "de", "it", "ru", "el"];
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  const langId = pool[dayIndex % pool.length];
  const vocab = getAllVocab(langId);
  const word = vocab[dayIndex % vocab.length];
  return { language: getLanguage(langId)!, word };
}

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
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

function Waveform({ active }: { active: boolean }) {
  const bars = [6, 14, 20, 12, 8];
  return (
    <div className="flex h-5 items-center gap-0.5" aria-hidden="true">
      {bars.map((h, i) => (
        <m.span
          key={i}
          className="w-1 rounded-full bg-primary"
          style={{ height: h }}
          animate={active ? { scaleY: [0.4, 1, 0.5, 0.9, 0.4] } : { scaleY: 0.4 }}
          transition={active ? { duration: 1.1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" } : undefined}
        />
      ))}
    </div>
  );
}

/** A stylized, in-app-data mockup for the hero — deliberately not a stock
 * photo or a fake device screenshot of a person; it's built from the same
 * design system as the rest of the app so it reads as authentic product UI.
 * The flashcard auto-flips and the XP count ticks up once on mount —
 * illustrative motion, not a claim that this is a live session. */
function HeroMockup() {
  const [revealed, setRevealed] = useState(false);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const flip = setInterval(() => setRevealed((r) => !r), 2600);
    return () => clearInterval(flip);
  }, []);

  useEffect(() => {
    const target = 340;
    const start = performance.now();
    const duration = 900;
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setXp(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

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
          <p className="text-lg font-bold text-foreground">{xp} / 500</p>
        </div>
      </div>

      <div className="relative mt-4 h-[92px] overflow-hidden rounded-2xl border border-border p-4">
        <p className="text-xs text-muted-foreground">Flashcard</p>
        <AnimatePresence mode="wait">
          <m.p
            key={revealed ? "back" : "front"}
            className="mt-1 text-2xl font-semibold text-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {revealed ? "to speak" : "Hablar"}
          </m.p>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border p-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Mic className="h-4 w-4 text-primary" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">"Buenos días"</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">Nice pronunciation!</p>
        </div>
        <Waveform active />
      </div>
    </div>
  );
}

export function Home() {
  const { user } = useAuth();
  const srsStates = getAllCardStates();
  const totalLessons = languages.reduce((sum, l) => sum + getLessons(l.id).length, 0);
  const totalVocab = languages.reduce((sum, l) => sum + getAllVocab(l.id).length, 0);
  const wotd = getWordOfTheDay();

  const PRODUCT_SCREENS: ProductScreen[] = [
    {
      title: "Progress Dashboard",
      body: (
        <div className="flex items-center gap-3">
          <ProgressRing percent={82} size={48} strokeWidth={5} />
          <div>
            <p className="text-sm font-semibold text-foreground">Level 8</p>
            <p className="text-xs text-muted-foreground">1,230 XP this week</p>
          </div>
        </div>
      ),
    },
    {
      title: "Grammar Cheat Sheet",
      body: (
        <div>
          <p className="text-sm font-semibold text-foreground">Ser vs. Estar</p>
          <p className="mt-1 text-xs text-muted-foreground">Soy alto — I am tall (permanent)</p>
          <p className="text-xs text-muted-foreground">Estoy cansado — I am tired (temporary)</p>
        </div>
      ),
    },
    {
      title: "Achievements",
      body: (
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/15 text-lg">🏆</span>
          <div>
            <p className="text-sm font-semibold text-foreground">Week Warrior</p>
            <p className="text-xs text-muted-foreground">7-day streak unlocked</p>
          </div>
        </div>
      ),
    },
    {
      title: "Speaking Practice",
      body: (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Mic className="h-4 w-4 text-primary" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">94% match</p>
            <Waveform active />
          </div>
        </div>
      ),
    },
    {
      title: "Daily Streak",
      body: (
        <div className="flex items-center gap-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${
                  i < 5 ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < 5 ? "🔥" : d}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Leaderboard",
      body: (
        <div className="flex flex-col gap-1.5">
          {[
            { name: "You", xp: 3120, you: true },
            { name: "maria_l", xp: 2980 },
            { name: "kenji88", xp: 2710 },
          ].map((row, i) => (
            <div key={row.name} className={`flex items-center justify-between text-xs ${row.you ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
              <span>
                {i + 1}. {row.name}
              </span>
              <span>{row.xp} XP</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "AI Conversation",
      comingSoon: !AI_FEATURES_ENABLED,
      body: (
        <div className="flex flex-col gap-1.5">
          <span className="self-start rounded-lg rounded-bl-sm bg-secondary px-2.5 py-1.5 text-xs text-secondary-foreground">
            ¿Cómo te llamas?
          </span>
          <span className="flex items-center gap-1 self-end rounded-lg rounded-br-sm bg-primary/10 px-2.5 py-1.5 text-xs text-primary">
            <m.span className="flex gap-0.5" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}>
              •••
            </m.span>
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-28 sm:gap-40">
      {/* Hero */}
      <div className="relative overflow-hidden pt-8 pb-4 sm:pt-16">
        <div className="aurora-backdrop" aria-hidden="true" />
        <FloatingLanguageCards />
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <m.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Speak a new language with <span className="brand-gradient-text">confidence</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground lg:mx-0">
              Practice with interactive lessons, pronunciation coaching, and spaced-repetition review that prepares
              you for real conversations — not just quiz screens.
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
                <AnimatedCounter value={languages.length} className="block text-2xl font-bold text-foreground" />
                <p>Languages</p>
              </div>
              <div>
                <AnimatedCounter value={totalLessons} className="block text-2xl font-bold text-foreground" />
                <p>Lessons</p>
              </div>
              <div>
                <AnimatedCounter value={totalVocab} suffix="+" className="block text-2xl font-bold text-foreground" />
                <p>Words & phrases</p>
              </div>
            </div>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <HeroMockup />
          </m.div>
        </div>
      </div>

      {/* How it works — the journey, up front */}
      <div id="how-it-works" className="scroll-mt-20">
        <SectionHeading eyebrow="The journey" title="From your first word to real fluency" />
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.step} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-sm font-semibold text-primary">Step {s.step}</p>
              <h3 className="font-heading mt-1 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
              {(i + 1) % 3 !== 0 && i < HOW_IT_WORKS.length - 1 && (
                <div className="absolute top-7 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-border lg:block" aria-hidden="true" />
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Explore the world — the signature feature */}
      <div>
        <SectionHeading eyebrow="Explore" title="Tap the world to hear a language" description="A real, clickable globe — only the countries LingoGlow actually teaches light up." />
        <div className="mt-14">
          <Suspense
            fallback={
              <div className="flex h-[360px] items-center justify-center rounded-2xl border border-border bg-card sm:h-[440px]">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-hidden="true" />
                <span className="sr-only">Loading globe…</span>
              </div>
            }
          >
            <LanguageGlobe />
          </Suspense>
        </div>
      </div>

      {/* Language picker */}
      <div id="languages" className="scroll-mt-20">
        <SectionHeading eyebrow="Step 1 · Discover" title="Choose your language" description="Work through lessons, then review with spaced-repetition flashcards." />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {languages.map((language) => {
            const vocab = getAllVocab(language.id);
            const started = vocab.some((card) => srsStates[card.id] !== undefined);
            const dueCount = vocab.filter((card) => isDue(srsStates[card.id])).length;
            const levels = getLessonsByLevel(language.id).map((g) => g.level);
            const difficultyLabel =
              levels.length === 0 ? undefined : levels.length === 1 ? LEVEL_LABELS[levels[0]] : `${LEVEL_LABELS[levels[0]]} → ${LEVEL_LABELS[levels[levels.length - 1]]}`;
            return (
              <TiltCard key={language.id}>
                <LanguageCard
                  language={language}
                  lessonCount={getLessons(language.id).length}
                  dueCount={dueCount}
                  started={started}
                  difficultyLabel={difficultyLabel}
                />
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Meet your AI tutor — honest spotlight, not a live demo */}
      <div className="mx-auto max-w-3xl">
        <div className="glow-card rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Bot className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </span>
          <p className="mt-4 text-sm font-semibold tracking-wide text-primary uppercase">Step 2 · Meet your tutor</p>
          <h2 className="font-heading mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            An AI conversation partner, built in
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Practice natural back-and-forth conversation with an AI tutor that gently corrects your mistakes as you
            go. It's built and wired up end-to-end —
            {AI_FEATURES_ENABLED ? " and live right now." : " we're finishing rollout, so it isn't switched on for everyone yet."}
          </p>
          {!AI_FEATURES_ENABLED && (
            <span className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground uppercase">
              Coming soon
            </span>
          )}
        </div>
      </div>

      {/* Product screens */}
      <div>
        <SectionHeading eyebrow="Step 3 · Practice" title="More than flashcards" description="A look at the real screens you'll use — and one we're still finishing." />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_SCREENS.map((screen, i) => (
            <m.div
              key={screen.title}
              className="glow-card rounded-2xl border border-border bg-card p-5"
              initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase">{screen.title}</p>
                {screen.comingSoon && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-semibold text-secondary-foreground uppercase">
                    Soon
                  </span>
                )}
              </div>
              <div className="mt-3 rounded-xl border border-border p-4">{screen.body}</div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="features" className="scroll-mt-20">
        <SectionHeading eyebrow="Everything you need" title="Built for learners who want to finish" description="Not a vocabulary quiz app — a full curriculum with grammar, speech, and structure." />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Reveal key={f.title}>
              <Card className="glow-card h-full border-border transition-all hover:-translate-y-0.5 hover:ring-primary/40">
                <CardContent>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading mt-3 font-semibold text-card-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Progress showcase */}
      <div>
        <SectionHeading eyebrow="Step 4 · Track" title="Progress you can actually see" description="Example of what your dashboard tracks once you're signed in." />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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

      {/* Word of the day — real, date-derived, not decorative fluff */}
      <div className="mx-auto max-w-xl">
        <div className="glow-card flex items-center gap-4 rounded-2xl border border-border bg-card p-5" style={{ ["--glow-color" as string]: wotd.language.glowColor }}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
            {wotd.language.flag}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">Word of the day · {wotd.language.name}</p>
            <p className="mt-0.5 truncate text-lg font-semibold text-foreground" dir="auto">
              {wotd.word.front} <span className="text-sm font-normal text-muted-foreground">— {wotd.word.back}</span>
            </p>
          </div>
          <Link to={`/language/${wotd.language.id}`} className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline">
            Learn it →
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <SectionHeading eyebrow="Illustrative examples" title="What learners are working toward" description="LingoGlow is early — these are representative examples, not collected reviews yet." />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
        <SectionHeading eyebrow="Step 5 · Connect" title="You don't have to do this alone" description="Real features, not a chat mockup — add friends, join a study group, and see where you rank." />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        <div className="brand-gradient-bg rounded-3xl px-6 py-16 text-center sm:px-16 sm:py-20">
          <Sparkles className="mx-auto h-8 w-8 text-white/90" strokeWidth={1.75} />
          <h2 className="font-heading mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
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
      <footer className="border-t border-border pt-14 pb-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          <div className="col-span-2">
            <span className="flex items-center gap-2">
              <LogoMark className="h-6 w-6" />
              <span className="brand-gradient-text text-lg font-bold">LingoGlow</span>
            </span>
            <p className="mt-2 text-sm text-muted-foreground">Language learning built to be finished.</p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      {link.href.startsWith("#") ? (
                        <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                          {link.label}
                        </Link>
                      )}
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
        <p className="mt-12 text-xs text-muted-foreground">© {new Date().getFullYear()} LingoGlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
