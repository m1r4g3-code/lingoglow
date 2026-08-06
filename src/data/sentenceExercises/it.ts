import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "it", level, prompt, tokens: words, correctOrder: words };
}

export const itSentences: SentenceExercise[] = [
  make("it-sent-1", "A1", "I speak Italian.", ["Io", "parlo", "italiano"]),
  make("it-sent-2", "A1", "The house is big.", ["La", "casa", "è", "grande"]),
  make("it-sent-3", "A1", "I have a dog.", ["Ho", "un", "cane"]),
  make("it-sent-4", "A1", "She is my sister.", ["Lei", "è", "mia", "sorella"]),
  make("it-sent-5", "A1", "We eat bread.", ["Noi", "mangiamo", "pane"]),
  make("it-sent-6", "A1", "Where is the bathroom?", ["Dov'è", "il", "bagno"]),
  make("it-sent-7", "A2", "I want water.", ["Voglio", "acqua"]),
  make("it-sent-8", "A2", "He is very tall.", ["Lui", "è", "molto", "alto"]),
];
