import type { ConjugationEntry } from "../../types";

const PRONOUNS = ["ik", "jij/u", "hij/zij/het", "wij", "jullie", "zij"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const nlConjugations: ConjugationEntry[] = [
  make("zijn", "to be", ["ben", "bent", "is", "zijn", "zijn", "zijn"]),
  make("hebben", "to have", ["heb", "hebt", "heeft", "hebben", "hebben", "hebben"]),
  make("gaan", "to go", ["ga", "gaat", "gaat", "gaan", "gaan", "gaan"]),
  make("spreken", "to speak", ["spreek", "spreekt", "spreekt", "spreken", "spreken", "spreken"]),
  make("willen", "to want", ["wil", "wilt", "wil", "willen", "willen", "willen"]),
  make("kunnen", "to be able to / can", ["kan", "kunt", "kan", "kunnen", "kunnen", "kunnen"]),
];
