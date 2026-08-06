import type { GrammarSheet } from "../../types";

export const zhGrammar: GrammarSheet[] = [
  {
    id: "zh-grammar-a1",
    languageId: "zh",
    level: "A1",
    title: "Mandarin Basics",
    sections: [
      {
        heading: "Word Order (SVO)",
        body: "Mandarin follows Subject-Verb-Object order, much like English. Verbs never change form for person or number — the same word works for 'I eat', 'you eat', and 'they eat'.",
        examples: ["我喝水 — wǒ hē shuǐ — I drink water", "他看书 — tā kàn shū — he reads books"],
      },
      {
        heading: "No Verb Conjugation",
        body: "There's no equivalent of Spanish/French verb endings. The same verb form is used for every subject and every tense; time and completion are shown instead by time words and particles like 了/在/过 (covered at A2).",
        examples: ["我是学生 — wǒ shì xuésheng — I am a student", "他是老师 — tā shì lǎoshī — he is a teacher"],
      },
      {
        heading: "Measure Words (量词)",
        body: "Between a number (or 这/那, 'this/that') and a noun, Mandarin requires a measure word — a classifier that depends on the noun's shape or category. 个 (gè) is the safe default for people and generic objects.",
        examples: ["一个人 — yí gè rén — one person", "两本书 — liǎng běn shū — two books", "三杯水 — sān bēi shuǐ — three cups of water"],
      },
      {
        heading: "Yes/No Questions with 吗",
        body: "The simplest way to turn any statement into a yes/no question is to add 吗 (ma) to the very end — the word order otherwise stays identical.",
        examples: ["你好吗？— nǐ hǎo ma? — Are you well?", "你是学生吗？— nǐ shì xuésheng ma? — Are you a student?"],
      },
    ],
  },
  {
    id: "zh-grammar-a2",
    languageId: "zh",
    level: "A2",
    title: "Aspect & Word Order",
    sections: [
      {
        heading: "了 (le) — Completed Action",
        body: "了 after a verb marks that an action is completed or a change has occurred — it's about completion, not strictly 'past tense'. A sentence about tomorrow can still use 了 once the action is viewed as done.",
        examples: ["我吃了 — wǒ chī le — I ate / I've eaten", "我吃了苹果 — wǒ chī le píngguǒ — I ate an apple"],
      },
      {
        heading: "在 (zài) — Ongoing Action",
        body: "在 placed before the verb marks an action in progress, similar to English '-ing'.",
        examples: ["我在吃饭 — wǒ zài chī fàn — I am eating", "他在看书 — tā zài kàn shū — he is reading"],
      },
      {
        heading: "过 (guò) — Past Experience",
        body: "过 right after a verb marks that something has ever happened at least once — an experience, not a specific completed event.",
        examples: ["我去过中国 — wǒ qùguò Zhōngguó — I have been to China (at some point)"],
      },
      {
        heading: "Time Word Placement",
        body: "Time words (今天, 明天, 每天...) go right after the subject and before the verb — not at the end of the sentence like in English.",
        examples: ["我今天很忙 — wǒ jīntiān hěn máng — I am busy today", "我明天去北京 — wǒ míngtiān qù Běijīng — I'm going to Beijing tomorrow"],
      },
    ],
  },
];
