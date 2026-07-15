import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "fr", level, prompt, tokens: words, correctOrder: words };
}

export const frSentences: SentenceExercise[] = [
  make("fr-sent-1", "A1", "I speak French.", ["Je", "parle", "français"]),
  make("fr-sent-2", "A1", "The house is big.", ["La", "maison", "est", "grande"]),
  make("fr-sent-3", "A1", "I have a dog.", ["J'ai", "un", "chien"]),
  make("fr-sent-4", "A1", "She is my sister.", ["Elle", "est", "ma", "sœur"]),
  make("fr-sent-5", "A1", "We eat bread.", ["Nous", "mangeons", "du", "pain"]),
  make("fr-sent-6", "A1", "Where is the bank?", ["Où", "est", "la", "banque"]),
  make("fr-sent-7", "A2", "I want water.", ["Je", "veux", "de", "l'eau"]),
  make("fr-sent-8", "A2", "He is very tall.", ["Il", "est", "très", "grand"]),
  make("fr-sent-9", "A2", "I am going to travel.", ["Je", "vais", "voyager"]),
  make("fr-sent-10", "A2", "The dog is black.", ["Le", "chien", "est", "noir"]),
  make("fr-sent-11", "A2", "I don't understand.", ["Je", "ne", "comprends", "pas"]),
  make("fr-sent-12", "A2", "My name is Ana.", ["Je", "m'appelle", "Ana"]),
];
