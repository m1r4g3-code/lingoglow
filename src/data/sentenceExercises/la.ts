import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "la", level, prompt, tokens: words, correctOrder: words };
}

export const laSentences: SentenceExercise[] = [
  make("la-sent-1", "A1", "I am a girl.", ["Puella", "sum"]),
  make("la-sent-2", "A1", "The house is big.", ["Domus", "magna", "est"]),
  make("la-sent-3", "A1", "I have a dog.", ["Canem", "habeo"]),
  make("la-sent-4", "A1", "She is my sister.", ["Est", "soror", "mea"]),
  make("la-sent-5", "A1", "We eat bread.", ["Panem", "edimus"]),
  make("la-sent-6", "A1", "Where is the bank?", ["Ubi", "est", "argentaria"]),
  make("la-sent-7", "A2", "I want water.", ["Aquam", "volo"]),
  make("la-sent-8", "A2", "He is tall.", ["Procerus", "est"]),
  make("la-sent-9", "A2", "I want to travel.", ["Peregrinari", "volo"]),
  make("la-sent-10", "A2", "The dog is black.", ["Canis", "niger", "est"]),
  make("la-sent-11", "A2", "I don't understand.", ["Non", "intellego"]),
  make("la-sent-12", "A2", "My name is Ana.", ["Nomen", "mihi", "Ana", "est"]),
];
