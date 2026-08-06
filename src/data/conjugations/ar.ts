import type { ConjugationEntry } from "../../types";

// Arabic has no infinitive form the way Spanish/German do — dictionaries cite
// verbs by their 3rd-person masculine singular past tense (e.g. ذهب "he went").
// The `infinitive` field below uses that citation form; `translation` gives the
// English "to ___" gloss. Forms shown are present tense (المضارع).
//
// Simplification note: Arabic distinguishes masculine/feminine "you" (أنتَ/أنتِ)
// and "he/she" (هو/هي) with different verb endings (e.g. تذهب vs. تذهبين), and
// "you both / they both" have separate dual forms not shown here at all. To keep
// this table readable for beginners we collapse each pair into one row and show
// only the masculine present-tense form — real usage should branch by gender.
const PRONOUNS = ["أنا", "أنتَ / أنتِ", "هو / هي", "نحن", "أنتم", "هم"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const arConjugations: ConjugationEntry[] = [
  make("ذهب", "to go", ["أذهب", "تذهب", "يذهب", "نذهب", "تذهبون", "يذهبون"]),
  make("أراد", "to want", ["أريد", "تريد", "يريد", "نريد", "تريدون", "يريدون"]),
  make("أكل", "to eat", ["آكل", "تأكل", "يأكل", "نأكل", "تأكلون", "يأكلون"]),
  make("شرب", "to drink", ["أشرب", "تشرب", "يشرب", "نشرب", "تشربون", "يشربون"]),
  make("تحدث", "to speak", ["أتحدث", "تتحدث", "يتحدث", "نتحدث", "تتحدثون", "يتحدثون"]),
  make("فعل", "to do / make", ["أفعل", "تفعل", "يفعل", "نفعل", "تفعلون", "يفعلون"]),
];
