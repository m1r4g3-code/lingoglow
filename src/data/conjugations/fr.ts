import type { ConjugationEntry } from "../../types";

const PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const frConjugations: ConjugationEntry[] = [
  make("parler", "to speak", ["parle", "parles", "parle", "parlons", "parlez", "parlent"]),
  make("finir", "to finish", ["finis", "finis", "finit", "finissons", "finissez", "finissent"]),
  make("vendre", "to sell", ["vends", "vends", "vend", "vendons", "vendez", "vendent"]),
  make("être", "to be", ["suis", "es", "est", "sommes", "êtes", "sont"]),
  make("avoir", "to have", ["ai", "as", "a", "avons", "avez", "ont"]),
  make("faire", "to do / make", ["fais", "fais", "fait", "faisons", "faites", "font"]),
  make("aller", "to go", ["vais", "vas", "va", "allons", "allez", "vont"]),
  make("vouloir", "to want", ["veux", "veux", "veut", "voulons", "voulez", "veulent"]),
  make("pouvoir", "to be able to / can", ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"]),
  make("dire", "to say", ["dis", "dis", "dit", "disons", "dites", "disent"]),
];
