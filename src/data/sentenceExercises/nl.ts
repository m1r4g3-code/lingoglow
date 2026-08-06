import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "nl", level, prompt, tokens: words, correctOrder: words };
}

export const nlSentences: SentenceExercise[] = [
  make("nl-sent-1", "A1", "I speak Dutch.", ["Ik", "spreek", "Nederlands"]),
  make("nl-sent-2", "A1", "I have a dog.", ["Ik", "heb", "een", "hond"]),
  make("nl-sent-3", "A1", "She is my sister.", ["Zij", "is", "mijn", "zus"]),
  make("nl-sent-4", "A1", "We eat bread.", ["Wij", "eten", "brood"]),
  make("nl-sent-5", "A1", "The house is big.", ["Het", "huis", "is", "groot"]),
  make("nl-sent-6", "A2", "Where is the bank?", ["Waar", "is", "de", "bank"]),
  make("nl-sent-7", "A2", "I want water.", ["Ik", "wil", "water"]),
  make("nl-sent-8", "A2", "Tomorrow I go to school.", ["Morgen", "ga", "ik", "naar", "school"]),
];
