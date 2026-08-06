import type { ConjugationEntry } from "../../types";

const PRONOUNS = ["io", "tu", "lui/lei", "noi", "voi", "loro"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const itConjugations: ConjugationEntry[] = [
  make("essere", "to be", ["sono", "sei", "è", "siamo", "siete", "sono"]),
  make("avere", "to have", ["ho", "hai", "ha", "abbiamo", "avete", "hanno"]),
  make("andare", "to go", ["vado", "vai", "va", "andiamo", "andate", "vanno"]),
  make("parlare", "to speak", ["parlo", "parli", "parla", "parliamo", "parlate", "parlano"]),
  make("fare", "to do / make", ["faccio", "fai", "fa", "facciamo", "fate", "fanno"]),
  make("volere", "to want", ["voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"]),
];
