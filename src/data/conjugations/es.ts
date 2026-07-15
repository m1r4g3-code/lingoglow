import type { ConjugationEntry } from "../../types";

const PRONOUNS = ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ellas/ustedes"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const esConjugations: ConjugationEntry[] = [
  make("hablar", "to speak", ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"]),
  make("comer", "to eat", ["como", "comes", "come", "comemos", "coméis", "comen"]),
  make("vivir", "to live", ["vivo", "vives", "vive", "vivimos", "vivís", "viven"]),
  make("ser", "to be (permanent)", ["soy", "eres", "es", "somos", "sois", "son"]),
  make("estar", "to be (state/location)", ["estoy", "estás", "está", "estamos", "estáis", "están"]),
  make("tener", "to have", ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"]),
  make("hacer", "to do / make", ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"]),
  make("ir", "to go", ["voy", "vas", "va", "vamos", "vais", "van"]),
  make("querer", "to want", ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"]),
  make("poder", "to be able to / can", ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"]),
];
