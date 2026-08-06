import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "ru", level, prompt, tokens: words, correctOrder: words };
}

export const ruSentences: SentenceExercise[] = [
  make("ru-sent-1", "A1", "I speak Russian.", ["Я", "говорю", "по-русски"]),
  make("ru-sent-2", "A1", "The house is big.", ["Дом", "большой"]),
  make("ru-sent-3", "A1", "I have a dog.", ["У", "меня", "есть", "собака"]),
  make("ru-sent-4", "A1", "She is my sister.", ["Она", "моя", "сестра"]),
  make("ru-sent-5", "A1", "We eat bread.", ["Мы", "едим", "хлеб"]),
  make("ru-sent-6", "A2", "I want water.", ["Я", "хочу", "воду"]),
  make("ru-sent-7", "A2", "He is very tall.", ["Он", "очень", "высокий"]),
  make("ru-sent-8", "A2", "I don't understand.", ["Я", "не", "понимаю"]),
];
