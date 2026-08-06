import type { GrammarSheet } from "../../types";

export const yoGrammar: GrammarSheet[] = [
  {
    id: "yo-grammar-a1",
    languageId: "yo",
    level: "A1",
    title: "Yoruba Basics",
    sections: [
      {
        heading: "Tone Marks & Underdots (Ohùn)",
        body: "Yoruba is a tonal language: pitch is part of a word's identity, not decoration. Every syllable carries one of three tones — high (marked with an acute accent, á), mid (left unmarked, a), or low (marked with a grave accent, à) — and changing the tone changes the word. Underdotted letters (ẹ, ọ, ṣ) are separate sounds from e, o, and s, not stylistic variants. Dropping tone marks or underdots doesn't just look careless — it can turn a real word into a different word or into nothing at all, which is why written Yoruba without diacritics is often hard for native readers to parse correctly.",
        examples: [
          "jẹ — to eat (mid tone)",
          "jẹ́ — to be / to become (high tone)",
          "ọwọ́ — hand (underdotted ọ)",
          "ṣe — to do / make (underdotted ṣ, a different sound from plain s)",
        ],
      },
      {
        heading: "Personal Pronouns",
        body: "Yoruba pronouns don't change for gender — 'ó' covers he, she, and it alike, so context tells you which. Subject pronouns go before the verb; possessive pronouns go after the noun they modify.",
        examples: [
          "mo — I (subject) / mi — my",
          "o — you, singular (subject) / rẹ — your",
          "ó — he, she, it (subject) / rẹ̀ — his, her, its",
          "a — we (subject) / wa — our",
          "ẹ — you, plural or formal (subject) / yín — your (plural)",
          "wọ́n — they (subject) / wọn — their",
        ],
      },
      {
        heading: "Basic Sentence Order (SVO)",
        body: "Yoruba follows Subject-Verb-Object order, the same as English, which makes basic sentences straightforward to map between the two languages. Verbs never change form for person or number — the pronoun alone carries that information.",
        examples: ["Mo fẹ́ omi — I want water", "Mo jẹ ẹran — I eat meat", "A rí ẹja — We see fish"],
      },
      {
        heading: "Yes/No and Wh- Questions",
        body: "Turn a statement into a yes/no question by placing 'Ṣé' at the very front — the rest of the word order stays the same. Wh- questions put the question word where the answer would go, or front it with 'ni' for emphasis.",
        examples: [
          "Ṣé o fẹ́ omi? — Do you want water?",
          "Kí ni orúkọ rẹ? — What is your name?",
          "Ta ni ìyí? — Who is this?",
          "Níbo ni o wà? — Where are you?",
        ],
      },
    ],
  },
  {
    id: "yo-grammar-a2",
    languageId: "yo",
    level: "A2",
    title: "Tense, Aspect & Sentence Building",
    sections: [
      {
        heading: "Tense & Aspect Particles",
        body: "Yoruba verbs don't conjugate for tense the way Spanish or English verbs do — the bare verb form never changes to show who or when. Instead, small particles placed before the verb carry that meaning: 'ń' marks an action in progress, 'ti' marks something already completed, and 'máa' marks the future.",
        examples: [
          "Mo ń jẹun — I am eating (progressive)",
          "Mo ti jẹun — I have eaten / I already ate (perfective)",
          "Mo máa jẹun — I will eat (future)",
          "Ó ń sọ̀rọ̀ — He/she is speaking",
        ],
      },
      {
        heading: "Negation with kò / ò",
        body: "Negate a verb by inserting 'kò' directly before it. In everyday speech 'kò' commonly fuses with the subject pronoun and shortens to 'ò', which is why 'mi ò' (not 'mo kò') is what you'll actually hear and see.",
        examples: ["Mi ò mọ̀ — I don't know", "Mi ò yé — I don't understand", "Kò sí níbẹ̀ — He/she/it isn't there"],
      },
      {
        heading: "Possession by Juxtaposition",
        body: "Yoruba shows possession simply by placing the possessor or a possessive pronoun right after the noun — no linking word or apostrophe-s needed.",
        examples: ["ilé mi — my house", "ọmọ Adé — Ade's child", "orúkọ rẹ — your name", "ìyá wa — our mother"],
      },
      {
        heading: "Marking Plural with àwọn",
        body: "Nouns don't change form for plural. Number is usually clear from context or a number word, and when it needs to be made explicit, the word 'àwọn' goes in front of the noun.",
        examples: ["ọmọ — child / children (unmarked)", "àwọn ọmọ — the children", "àwọn ọ̀rẹ́ mi — my friends"],
      },
    ],
  },
];
