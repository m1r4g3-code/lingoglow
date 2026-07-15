import type { CefrLevel, Language, Lesson, VocabCategory } from "../types";
import { esLessons } from "./lessons/es";
import { frLessons } from "./lessons/fr";
import { laLessons } from "./lessons/la";

// To add a new language: add an entry here, create src/data/lessons/<id>.ts
// exporting a `Lesson[]` array (see any existing file for the shape), then
// register it in the lessonsByLanguage map below.
export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    code: "ES",
    glowColor: "rgba(251, 146, 60, 0.35)",
    speechLang: "es-ES",
    sttSupported: true,
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    code: "FR",
    glowColor: "rgba(96, 165, 250, 0.35)",
    speechLang: "fr-FR",
    sttSupported: true,
  },
  {
    id: "la",
    name: "Latin",
    nativeName: "Latina",
    code: "LA",
    glowColor: "rgba(250, 204, 21, 0.35)",
    speechLang: "la",
    sttSupported: false, // browsers don't ship Latin speech-recognition models
  },
];

export const lessonsByLanguage: Record<string, Lesson[]> = {
  es: esLessons,
  fr: frLessons,
  la: laLessons,
};

export const LEVEL_LABELS: Record<CefrLevel, string> = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
};

export function getLanguage(id: string): Language | undefined {
  return languages.find((l) => l.id === id);
}

export function getLessons(languageId: string): Lesson[] {
  return lessonsByLanguage[languageId] ?? [];
}

export function getLessonsByLevel(languageId: string): { level: CefrLevel; lessons: Lesson[] }[] {
  const lessons = getLessons(languageId);
  const levels: CefrLevel[] = ["A1", "A2", "B1"];
  return levels
    .map((level) => ({ level, lessons: lessons.filter((l) => l.level === level) }))
    .filter((group) => group.lessons.length > 0);
}

export function getLesson(languageId: string, lessonId: string): Lesson | undefined {
  return getLessons(languageId).find((l) => l.id === lessonId);
}

export function getAllVocab(languageId: string) {
  return getLessons(languageId).flatMap((lesson) =>
    lesson.vocab.map((card) => ({ ...card, lessonId: lesson.id, lessonTitle: lesson.title }))
  );
}

// Category/frequency are derived rather than hand-tagged on ~1,400 cards:
// category from the lesson's topic, frequency from teaching order (earlier
// lessons cover more common words, by design of the curriculum).
const CATEGORY_BY_LESSON: Record<string, VocabCategory> = {
  idioms: "idiom",
  travel: "travel",
  airport: "travel",
  professions: "business",
  health: "medical",
};

export function getVocabCategory(lessonId: string): VocabCategory {
  return CATEGORY_BY_LESSON[lessonId] ?? "general";
}

export function getVocabWithMeta(languageId: string) {
  return getAllVocab(languageId).map((card, index) => ({
    ...card,
    category: card.category ?? getVocabCategory(card.lessonId),
    frequencyRank: card.frequencyRank ?? index + 1,
  }));
}

export function getVocabByCategory(languageId: string, category: VocabCategory) {
  return getVocabWithMeta(languageId).filter((card) => card.category === category);
}
