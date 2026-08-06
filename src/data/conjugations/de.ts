import type { ConjugationEntry } from "../../types";

const PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const deConjugations: ConjugationEntry[] = [
  make("sein", "to be", ["bin", "bist", "ist", "sind", "seid", "sind"]),
  make("haben", "to have", ["habe", "hast", "hat", "haben", "habt", "haben"]),
  make("gehen", "to go", ["gehe", "gehst", "geht", "gehen", "geht", "gehen"]),
  make("sprechen", "to speak", ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"]),
  make("machen", "to do / make", ["mache", "machst", "macht", "machen", "macht", "machen"]),
  make("wollen", "to want", ["will", "willst", "will", "wollen", "wollt", "wollen"]),
];
