import type { GrammarSheet } from "../../types";

export const itGrammar: GrammarSheet[] = [
  {
    id: "it-grammar-a1",
    languageId: "it",
    level: "A1",
    title: "Italian Basics",
    sections: [
      {
        heading: "Gender & Articles",
        body: "Italian nouns are masculine or feminine. Masculine singular nouns usually end in -o and take 'il' (or 'lo' before s+consonant, z, or gn); feminine singular nouns usually end in -a and take 'la'. Before a vowel, both shorten to l'.",
        examples: ["il libro — the book", "la casa — the house", "lo studente — the student", "l'amico — the friend"],
      },
      {
        heading: "Subject Pronouns",
        body: "io, tu, lui/lei, noi, voi, loro. Subject pronouns are frequently dropped in Italian, since the verb ending already shows who's doing the action.",
        examples: ["(Io) parlo italiano. — I speak Italian.", "(Lei) mangia la pizza. — She eats pizza."],
      },
      {
        heading: "Essere & Avere",
        body: "essere (to be) and avere (to have) are the two most important irregular verbs — they're used constantly on their own and as building blocks for other tenses.",
        examples: ["io sono, tu sei, lui è — I am, you are, he is", "io ho, tu hai, lui ha — I have, you have, he has"],
      },
      {
        heading: "Plural Formation",
        body: "Masculine nouns ending in -o generally pluralize to -i; feminine nouns ending in -a pluralize to -e; nouns of either gender ending in -e pluralize to -i.",
        examples: ["libro → libri", "casa → case", "stazione → stazioni"],
      },
    ],
  },
  {
    id: "it-grammar-a2",
    languageId: "it",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Regular -are / -ere / -ire Verbs",
        body: "Regular verbs fall into three families by their infinitive ending, each with its own set of present-tense endings.",
        examples: [
          "parlare → parlo, parli, parla, parliamo, parlate, parlano",
          "vedere → vedo, vedi, vede, vediamo, vedete, vedono",
          "dormire → dormo, dormi, dorme, dormiamo, dormite, dormono",
        ],
      },
      {
        heading: "Adjective Agreement",
        body: "Adjectives agree in gender and number with the noun they describe, and usually come after it.",
        examples: ["la macchina rossa — the red car", "il libro rosso — the red book", "le macchine rosse — the red cars"],
      },
      {
        heading: "Asking Questions",
        body: "Word order often stays the same as a statement — rising intonation (or a question mark in writing) is what signals a question. Question words come first.",
        examples: ["Dove abiti? — Where do you live?", "Che ore sono? — What time is it?"],
      },
      {
        heading: "Near Future: andare + a + infinitive",
        body: "The simplest way to talk about something you're about to do.",
        examples: ["Vado a mangiare. — I'm going to eat.", "Andiamo a viaggiare. — We're going to travel."],
      },
    ],
  },
];
