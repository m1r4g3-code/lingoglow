import type { ConjugationEntry } from "../../types";

const PRONOUNS = ["я", "ты", "он/она/оно", "мы", "вы", "они"];

function make(infinitive: string, translation: string, forms: string[]): ConjugationEntry {
  return {
    infinitive,
    translation,
    tense: "Present",
    forms: PRONOUNS.map((pronoun, i) => ({ pronoun, form: forms[i] })),
  };
}

export const ruConjugations: ConjugationEntry[] = [
  make("говорить", "to speak", ["говорю", "говоришь", "говорит", "говорим", "говорите", "говорят"]),
  make("жить", "to live", ["живу", "живёшь", "живёт", "живём", "живёте", "живут"]),
  make("идти", "to go (on foot)", ["иду", "идёшь", "идёт", "идём", "идёте", "идут"]),
  make("хотеть", "to want", ["хочу", "хочешь", "хочет", "хотим", "хотите", "хотят"]),
  make("читать", "to read", ["читаю", "читаешь", "читает", "читаем", "читаете", "читают"]),
  make("писать", "to write", ["пишу", "пишешь", "пишет", "пишем", "пишете", "пишут"]),
];
