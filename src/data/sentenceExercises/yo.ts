import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "yo", level, prompt, tokens: words, correctOrder: words };
}

export const yoSentences: SentenceExercise[] = [
  make("yo-sent-1", "A1", "I speak Yoruba.", ["Mo", "sọ̀rọ̀", "Yorùbá"]),
  make("yo-sent-2", "A1", "I have a dog.", ["Mo", "ní", "ajá", "kan"]),
  make("yo-sent-3", "A1", "She is my sister.", ["Òun", "ni", "arábìnrin", "mi"]),
  make("yo-sent-4", "A1", "We eat bread.", ["A", "jẹ", "búrẹ́dì"]),
  make("yo-sent-5", "A1", "The house is big.", ["Ilé", "náà", "tóbi"]),
  make("yo-sent-6", "A2", "Where is the bank?", ["Níbo", "ni", "báńkì", "wà"]),
  make("yo-sent-7", "A2", "I want water.", ["Mo", "fẹ́", "omi"]),
  make("yo-sent-8", "A2", "I am eating.", ["Mo", "ń", "jẹun"]),
];
