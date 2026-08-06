import type { GrammarSheet } from "../../types";

export const deGrammar: GrammarSheet[] = [
  {
    id: "de-grammar-a1",
    languageId: "de",
    level: "A1",
    title: "German Basics",
    sections: [
      {
        heading: "Gender & Articles",
        body: "Every German noun is masculine, feminine, or neuter: der, die, or das. The gender isn't predictable from meaning, so it's best learned together with each new word. Nouns are always capitalized, no matter where they fall in the sentence.",
        examples: ["der Mann — the man (masc.)", "die Frau — the woman (fem.)", "das Kind — the child (neut.)", "ein Hund — a dog"],
      },
      {
        heading: "Subject Pronouns",
        body: "ich, du, er/sie/es, wir, ihr, sie/Sie. Sie, capitalized, is the formal 'you' used with strangers, teachers, or in business — never confuse it with lowercase sie ('she' or 'they').",
        examples: ["Ich spreche Deutsch. — I speak German.", "Sprechen Sie Englisch? — Do you speak English? (formal)"],
      },
      {
        heading: "Sein & Haben",
        body: "sein (to be) and haben (to have) are the two most common irregular verbs in German, and they're the backbone of many other tenses, so they're worth memorizing first.",
        examples: ["ich bin, du bist, er ist — I am, you are, he is", "ich habe, du hast, er hat — I have, you have, he has"],
      },
      {
        heading: "Verb-Second Word Order",
        body: "In a plain statement, the conjugated verb is always the second element of the sentence — even when something other than the subject starts it off. The subject then simply moves after the verb.",
        examples: ["Ich trinke Kaffee. — I drink coffee.", "Heute trinke ich Kaffee. — Today I drink coffee. (verb stays in position two)"],
      },
    ],
  },
  {
    id: "de-grammar-a2",
    languageId: "de",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Regular Present-Tense Verbs",
        body: "Most verbs are regular: drop the -en from the infinitive and add an ending for each person.",
        examples: [
          "machen → ich mache, du machst, er macht, wir machen, ihr macht, sie machen",
          "spielen → ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen",
        ],
      },
      {
        heading: "Nominative & Accusative",
        body: "The subject of a sentence takes the nominative case; the direct object takes the accusative. Only the masculine article changes between the two: der/ein becomes den/einen.",
        examples: ["Der Hund sieht den Mann. — The dog sees the man.", "Ich habe einen Bruder. — I have a brother."],
      },
      {
        heading: "Modal Verbs",
        body: "Modal verbs like können, wollen, and müssen are irregular in the singular and send the main verb to the very end of the sentence in its infinitive form.",
        examples: ["Ich kann Deutsch sprechen. — I can speak German.", "Wir müssen jetzt gehen. — We have to go now."],
      },
      {
        heading: "Negation: nicht vs. kein",
        body: "Use nicht to negate a verb, adjective, or specific idea. Use kein — which takes endings like ein — to negate a noun that would otherwise appear with 'ein' or no article at all.",
        examples: ["Ich verstehe nicht. — I don't understand.", "Ich habe keinen Hund. — I don't have a dog."],
      },
    ],
  },
];
