import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "hi", level, prompt, tokens: words, correctOrder: words };
}

export const hiSentences: SentenceExercise[] = [
  make("hi-sent-1", "A1", "I speak Hindi.", ["मैं", "हिन्दी", "बोलता", "हूँ"]),
  make("hi-sent-2", "A1", "The house is big.", ["घर", "बड़ा", "है"]),
  make("hi-sent-3", "A1", "I have a dog.", ["मेरे", "पास", "एक", "कुत्ता", "है"]),
  make("hi-sent-4", "A1", "She is my sister.", ["वह", "मेरी", "बहन", "है"]),
  make("hi-sent-5", "A1", "We eat bread.", ["हम", "रोटी", "खाते", "हैं"]),
  make("hi-sent-6", "A2", "Where is the bank?", ["बैंक", "कहाँ", "है"]),
  make("hi-sent-7", "A2", "I want water.", ["मुझे", "पानी", "चाहिए"]),
  make("hi-sent-8", "A2", "He is very tall.", ["वह", "बहुत", "लंबा", "है"]),
];
