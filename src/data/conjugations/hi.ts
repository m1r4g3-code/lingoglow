import type { ConjugationEntry } from "../../types";

// Hindi verbs agree in gender as well as person (a man says karta hai, a woman
// says karti hai, for the same meaning) — see the "Present Habitual Tense"
// section of hiGrammar for the real rule. This drill fits the app's fixed
// six-pronoun-slot shape by using the masculine-subject forms throughout,
// which is a deliberate simplification, not the whole grammatical picture.
const PRONOUNS = ["मैं", "तुम", "वह", "हम", "तुम सब / आप", "वे"];

function make(infinitive: string, translation: string, tense: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense,
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const hiConjugations: ConjugationEntry[] = [
  make("होना", "to be", "Present", ["हूँ", "हो", "है", "हैं", "हैं", "हैं"]),
  make("करना", "to do / make (masc.)", "Present Habitual", ["करता हूँ", "करते हो", "करता है", "करते हैं", "करते हैं", "करते हैं"]),
  make("जाना", "to go (masc.)", "Present Habitual", ["जाता हूँ", "जाते हो", "जाता है", "जाते हैं", "जाते हैं", "जाते हैं"]),
  make("खाना", "to eat (masc.)", "Present Habitual", ["खाता हूँ", "खाते हो", "खाता है", "खाते हैं", "खाते हैं", "खाते हैं"]),
  make("पीना", "to drink (masc.)", "Present Habitual", ["पीता हूँ", "पीते हो", "पीता है", "पीते हैं", "पीते हैं", "पीते हैं"]),
  make("बोलना", "to speak (masc.)", "Present Habitual", ["बोलता हूँ", "बोलते हो", "बोलता है", "बोलते हैं", "बोलते हैं", "बोलते हैं"]),
];
