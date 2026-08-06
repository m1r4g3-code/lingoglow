import type { GrammarSheet } from "../../types";

export const ruGrammar: GrammarSheet[] = [
  {
    id: "ru-grammar-a1",
    languageId: "ru",
    level: "A1",
    title: "Russian Basics",
    sections: [
      {
        heading: "No Articles",
        body: "Russian has no words for 'a' or 'the'. A noun's meaning as specific or general comes entirely from context.",
        examples: ["книга — a book / the book", "стол — a table / the table"],
      },
      {
        heading: "Noun Gender",
        body: "Every noun is masculine, feminine, or neuter, and the ending usually gives it away: a bare consonant is masculine, -а/-я is feminine, -о/-е is neuter.",
        examples: ["стол (m.) — table", "мама (f.) — mom", "окно (n.) — window"],
      },
      {
        heading: "Personal Pronouns",
        body: "я, ты, он/она/оно, мы, вы, они. 'Вы' also works as the polite form for a single person, similar to 'usted' in Spanish.",
        examples: ["я говорю — I speak", "она читает — she reads", "мы живём — we live"],
      },
      {
        heading: "No 'To Be' in the Present Tense",
        body: "Russian drops the verb 'to be' in present-tense statements — the subject sits right next to the description, sometimes separated by a dash in writing.",
        examples: ["Я студент — I am a student", "Она врач — She is a doctor", "Москва — столица — Moscow is the capital"],
      },
    ],
  },
  {
    id: "ru-grammar-a2",
    languageId: "ru",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Present-Tense Verb Conjugation",
        body: "Verbs split into two conjugation patterns. First-conjugation verbs (many end in -ать) take -ю/-ешь/-ет/-ем/-ете/-ют; second-conjugation verbs (many end in -ить) take -ю/-ишь/-ит/-им/-ите/-ят.",
        examples: [
          "читать → читаю, читаешь, читает, читаем, читаете, читают",
          "говорить → говорю, говоришь, говорит, говорим, говорите, говорят",
        ],
      },
      {
        heading: "Cases: Nominative & Accusative",
        body: "Russian nouns change endings depending on their role in the sentence. The subject stays in the nominative (dictionary) form; a direct object often shifts to the accusative — feminine -а nouns become -у.",
        examples: ["Это мама — This is mom (nominative)", "Я вижу маму — I see mom (accusative)", "Я хочу воду — I want water"],
      },
      {
        heading: "Possessives",
        body: "мой/моя/моё/мои, твой/твоя/твоё/твои, наш/наша/наше/наши — these agree with the gender and number of the thing owned, not the owner.",
        examples: ["мой брат — my brother", "моя сестра — my sister", "моё имя — my name"],
      },
      {
        heading: "Asking Questions",
        body: "Yes/no questions use the same word order as statements, just with rising intonation (and a question mark in writing). Questions built on a question word put that word first.",
        examples: ["Ты говоришь по-русски? — Do you speak Russian?", "Где ты живёшь? — Where do you live?"],
      },
    ],
  },
];
