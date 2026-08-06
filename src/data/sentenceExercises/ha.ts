import type { SentenceExercise } from "../../types";

// Standard Boko (Latin-script) Hausa orthography is used throughout, including
// the special letters ɓ, ɗ, ƙ and the glottal-stop apostrophe (ʼ), matching
// src/data/lessons/ha.ts.
function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "ha", level, prompt, tokens: words, correctOrder: words };
}

export const haSentences: SentenceExercise[] = [
  make("ha-sent-1", "A1", "I speak Hausa.", ["Ina", "jin", "Hausa"]),
  make("ha-sent-2", "A1", "The house is big.", ["Gidan", "babba", "ne"]),
  make("ha-sent-3", "A1", "I have a dog.", ["Ina", "da", "kare"]),
  make("ha-sent-4", "A1", "She is my sister.", ["Ita", "ʼyarʼuwata", "ce"]),
  make("ha-sent-5", "A1", "We eat bread.", ["Muna", "cin", "gurasa"]),
  make("ha-sent-6", "A2", "Where is the market?", ["Ina", "kasuwa", "take"]),
  make("ha-sent-7", "A2", "I want water.", ["Ina", "son", "ruwa"]),
  make("ha-sent-8", "A2", "I don't understand.", ["Ban", "gane", "ba"]),
];
