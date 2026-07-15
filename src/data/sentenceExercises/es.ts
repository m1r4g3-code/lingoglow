import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "es", level, prompt, tokens: words, correctOrder: words };
}

export const esSentences: SentenceExercise[] = [
  make("es-sent-1", "A1", "I speak Spanish.", ["Yo", "hablo", "español"]),
  make("es-sent-2", "A1", "The house is big.", ["La", "casa", "es", "grande"]),
  make("es-sent-3", "A1", "I have a dog.", ["Tengo", "un", "perro"]),
  make("es-sent-4", "A1", "She is my sister.", ["Ella", "es", "mi", "hermana"]),
  make("es-sent-5", "A1", "We eat bread.", ["Nosotros", "comemos", "pan"]),
  make("es-sent-6", "A1", "Where is the bank?", ["Dónde", "está", "el", "banco"]),
  make("es-sent-7", "A2", "I want water.", ["Quiero", "agua"]),
  make("es-sent-8", "A2", "He is very tall.", ["Él", "es", "muy", "alto"]),
  make("es-sent-9", "A2", "I am going to travel.", ["Voy", "a", "viajar"]),
  make("es-sent-10", "A2", "The dog is black.", ["El", "perro", "es", "negro"]),
  make("es-sent-11", "A2", "I don't understand.", ["No", "entiendo"]),
  make("es-sent-12", "A2", "My name is Ana.", ["Me", "llamo", "Ana"]),
];
