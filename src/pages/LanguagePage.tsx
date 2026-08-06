import { Link, Navigate, useParams } from "react-router-dom";
import {
  Bot,
  BarChart3,
  BookOpen,
  Bookmark,
  GraduationCap,
  Headphones,
  Map,
  NotebookPen,
  PenLine,
  Puzzle,
  Repeat2,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { getLanguage, getLessonsByLevel, getAllVocab, LEVEL_LABELS } from "../data/languages";
import { getAllCardStates } from "../lib/storage";
import { isDue } from "../lib/srs";
import { AI_FEATURES_ENABLED } from "../config";
import { CONJUGATION_LANGUAGE_IDS } from "../data/conjugationLanguages";

const PRACTICE_ICONS: Record<string, LucideIcon> = {
  "skill-tree": Map,
  grammar: BookOpen,
  sentences: Puzzle,
  conjugation: Repeat2,
  dictation: PenLine,
  comprehension: Headphones,
  "difficult-words": Bookmark,
  frequency: BarChart3,
  "category/idiom": Tags,
  "ai-tutor": Bot,
  writing: NotebookPen,
  certificate: GraduationCap,
};

export function LanguagePage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const levelGroups = getLessonsByLevel(languageId);
  const totalLessons = levelGroups.reduce((sum, g) => sum + g.lessons.length, 0);
  const vocab = getAllVocab(languageId);
  const srsStates = getAllCardStates();
  const started = vocab.some((card) => srsStates[card.id] !== undefined);
  const dueCount = vocab.filter((card) => isDue(srsStates[card.id])).length;

  return (
    <div>
      <Link to="/" className="text-sm text-muted-foreground hover:underline">
        ← All languages
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <span
          className="glow-text flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted text-base font-bold tracking-wide text-foreground"
          style={{ ["--glow-color" as string]: language.glowColor }}
        >
          {language.code}
        </span>
        <div>
          <h1 className="glow-text flex items-center gap-2 text-2xl font-bold">
            <span aria-hidden="true">{language.flag}</span>
            {language.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {language.nativeName} · {totalLessons} lessons
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {started
          ? "Pick up where you left off, or jump into any lesson below."
          : `New to ${language.name}? Start with the first lesson below, or dive into a specific skill.`}
      </p>

      <Link
        to={`/language/${language.id}/review`}
        className="glow-card mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold"
        style={{ ["--glow-color" as string]: language.glowColor }}
      >
        Review flashcards
        {started ? (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
            {dueCount} due
          </span>
        ) : (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
            Get started
          </span>
        )}
      </Link>

      <h2 className="mt-10 mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Practice
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { to: "skill-tree", label: "Skill Tree" },
          { to: "grammar", label: "Grammar" },
          { to: "sentences", label: "Sentence Building" },
          ...(CONJUGATION_LANGUAGE_IDS.includes(language.id) ? [{ to: "conjugation", label: "Conjugation Drills" }] : []),
          { to: "dictation", label: "Dictation" },
          { to: "comprehension", label: "Reading & Listening" },
          { to: "difficult-words", label: "Favorites & Difficult" },
          { to: "frequency", label: "Common Words" },
          { to: "category/idiom", label: "Categories" },
          ...(AI_FEATURES_ENABLED
            ? [
                { to: "ai-tutor", label: "AI Conversation" },
                { to: "writing", label: "AI Writing Feedback" },
              ]
            : []),
          { to: "certificate", label: "Certificates" },
        ].map((item) => {
          const Icon = PRACTICE_ICONS[item.to];
          return (
            <Link
              key={item.to}
              to={`/language/${language.id}/${item.to}`}
              className="glow-card flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4 text-center"
              style={{ ["--glow-color" as string]: language.glowColor }}
            >
              <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {levelGroups.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No lessons yet for {language.name}. Add some in{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5">
            src/data/lessons/{language.id}.ts
          </code>
        </div>
      ) : (
        levelGroups.map(({ level, lessons }) => (
          <div key={level} className="mt-10">
            <h2 className="mb-3 flex items-baseline gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {LEVEL_LABELS[level]}
              <span className="text-xs font-normal normal-case text-muted-foreground/70">{level}</span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/language/${language.id}/lesson/${lesson.id}`}
                  className="glow-card rounded-xl border border-border bg-card p-5"
                  style={{ ["--glow-color" as string]: language.glowColor }}
                >
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{lesson.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{lesson.vocab.length} words</p>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
