import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "de", level, prompt, tokens: words, correctOrder: words };
}

export const deSentences: SentenceExercise[] = [
  make("de-sent-1", "A1", "I speak German.", ["Ich", "spreche", "Deutsch"]),
  make("de-sent-2", "A1", "The house is big.", ["Das", "Haus", "ist", "groß"]),
  make("de-sent-3", "A1", "I have a dog.", ["Ich", "habe", "einen", "Hund"]),
  make("de-sent-4", "A1", "She is my sister.", ["Sie", "ist", "meine", "Schwester"]),
  make("de-sent-5", "A1", "We eat bread.", ["Wir", "essen", "Brot"]),
  make("de-sent-6", "A1", "Where is the bathroom?", ["Wo", "ist", "die", "Toilette"]),
  make("de-sent-7", "A2", "I want water.", ["Ich", "will", "Wasser"]),
  make("de-sent-8", "A2", "He is very tall.", ["Er", "ist", "sehr", "groß"]),
];
