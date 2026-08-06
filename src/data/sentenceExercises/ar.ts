import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "ar", level, prompt, tokens: words, correctOrder: words };
}

export const arSentences: SentenceExercise[] = [
  make("ar-sent-1", "A1", "I speak Arabic.", ["أنا", "أتحدث", "العربية"]),
  make("ar-sent-2", "A1", "The house is big.", ["البيت", "كبير"]),
  make("ar-sent-3", "A1", "She is my sister.", ["هي", "أختي"]),
  make("ar-sent-4", "A1", "We eat bread.", ["نحن", "نأكل", "الخبز"]),
  make("ar-sent-5", "A1", "My name is Sara.", ["اسمي", "سارة"]),
  make("ar-sent-6", "A2", "Where is the bathroom?", ["أين", "الحمام"]),
  make("ar-sent-7", "A2", "I want water.", ["أريد", "ماء"]),
  make("ar-sent-8", "A2", "I go to work every day.", ["أنا", "أذهب", "إلى", "العمل", "كل", "يوم"]),
];
