import type { ConjugationEntry } from "../../types";

const PRONOUNS = ["εγώ", "εσύ", "αυτός/αυτή/αυτό", "εμείς", "εσείς", "αυτοί/αυτές/αυτά"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const elConjugations: ConjugationEntry[] = [
  make("είμαι", "to be", ["είμαι", "είσαι", "είναι", "είμαστε", "είστε", "είναι"]),
  make("έχω", "to have", ["έχω", "έχεις", "έχει", "έχουμε", "έχετε", "έχουν"]),
  make("μιλάω", "to speak", ["μιλάω", "μιλάς", "μιλάει", "μιλάμε", "μιλάτε", "μιλάνε"]),
  make("πηγαίνω", "to go", ["πηγαίνω", "πηγαίνεις", "πηγαίνει", "πηγαίνουμε", "πηγαίνετε", "πηγαίνουν"]),
  make("θέλω", "to want", ["θέλω", "θέλεις", "θέλει", "θέλουμε", "θέλετε", "θέλουν"]),
  make("κάνω", "to do / make", ["κάνω", "κάνεις", "κάνει", "κάνουμε", "κάνετε", "κάνουν"]),
];
