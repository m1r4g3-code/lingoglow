import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "zh", level, prompt, tokens: words, correctOrder: words };
}

export const zhSentences: SentenceExercise[] = [
  make("zh-sent-1", "A1", "I speak Chinese.", ["我", "说", "中文"]),
  make("zh-sent-2", "A1", "The house is big.", ["房子", "很", "大"]),
  make("zh-sent-3", "A1", "She is my older sister.", ["她", "是", "我的", "姐姐"]),
  make("zh-sent-4", "A1", "We eat bread.", ["我们", "吃", "面包"]),
  make("zh-sent-5", "A1", "Where is the bathroom?", ["洗手间", "在", "哪里"]),
  make("zh-sent-6", "A2", "I want water.", ["我", "想要", "水"]),
  make("zh-sent-7", "A2", "I already ate an apple.", ["我", "吃", "了", "苹果"]),
  make("zh-sent-8", "A2", "I don't understand.", ["我", "不", "明白"]),
];
