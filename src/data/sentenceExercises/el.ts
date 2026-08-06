import type { SentenceExercise } from "../../types";

function make(id: string, level: "A1" | "A2", prompt: string, words: string[]): SentenceExercise {
  return { id, languageId: "el", level, prompt, tokens: words, correctOrder: words };
}

export const elSentences: SentenceExercise[] = [
  make("el-sent-1", "A1", "I speak Greek.", ["Εγώ", "μιλάω", "ελληνικά"]),
  make("el-sent-2", "A1", "The house is big.", ["Το", "σπίτι", "είναι", "μεγάλο"]),
  make("el-sent-3", "A1", "I have a dog.", ["Έχω", "έναν", "σκύλο"]),
  make("el-sent-4", "A1", "She is my sister.", ["Αυτή", "είναι", "η", "αδελφή", "μου"]),
  make("el-sent-5", "A1", "We eat bread.", ["Εμείς", "τρώμε", "ψωμί"]),
  make("el-sent-6", "A2", "Where is the bank?", ["Πού", "είναι", "η", "τράπεζα"]),
  make("el-sent-7", "A2", "I want water.", ["Θέλω", "νερό"]),
  make("el-sent-8", "A2", "He is very tall.", ["Αυτός", "είναι", "πολύ", "ψηλός"]),
];
