import type { GrammarSheet } from "../../types";

export const frGrammar: GrammarSheet[] = [
  {
    id: "fr-grammar-a1",
    languageId: "fr",
    level: "A1",
    title: "French Basics",
    sections: [
      {
        heading: "Gender & Articles",
        body: "Every noun is masculine or feminine — le/un for masculine, la/une for feminine. Gender is often unpredictable, so learn it with the noun.",
        examples: ["le livre — the book", "la table — the table", "un chien — a dog", "une maison — a house"],
      },
      {
        heading: "Plural Formation",
        body: "Usually add a silent -s. Some nouns have irregular plurals.",
        examples: ["livre → livres", "cheval → chevaux", "œil → yeux"],
      },
      {
        heading: "Subject Pronouns",
        body: "je, tu, il/elle/on, nous, vous, ils/elles.",
        examples: ["Je parle — I speak", "Elle mange — She eats"],
      },
      {
        heading: "Être vs. Avoir",
        body: "The two essential irregular verbs: être (to be) and avoir (to have).",
        examples: [
          "être → suis, es, est, sommes, êtes, sont",
          "avoir → ai, as, a, avons, avez, ont",
        ],
      },
      {
        heading: "Negation",
        body: "Wrap the verb in ne...pas.",
        examples: ["Je ne parle pas anglais — I don't speak English"],
      },
    ],
  },
  {
    id: "fr-grammar-a2",
    languageId: "fr",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Regular Present-Tense Verbs",
        body: "Three verb families by infinitive ending: -ER, -IR, -RE.",
        examples: [
          "parler → parle, parles, parle, parlons, parlez, parlent",
          "finir → finis, finis, finit, finissons, finissez, finissent",
        ],
      },
      {
        heading: "Adjective Agreement & Placement",
        body: "Most adjectives follow the noun and agree in gender/number; a handful of common ones (grand, petit, bon...) go before.",
        examples: ["une voiture rouge — a red car", "des voitures rouges — red cars", "un grand garçon — a tall boy"],
      },
      {
        heading: "Asking Questions",
        body: "Three ways: est-ce que + statement, inversion, or just rising intonation.",
        examples: ["Est-ce que tu viens? — Are you coming?", "Viens-tu? — Are you coming? (inversion)"],
      },
      {
        heading: "Possessives",
        body: "mon/ma/mes, ton/ta/tes, son/sa/ses, notre/nos — agree with the thing owned, not the owner.",
        examples: ["mon livre — my book", "ma maison — my house"],
      },
      {
        heading: "Near Future: aller + infinitive",
        body: "The easiest way to talk about the future.",
        examples: ["Je vais manger — I'm going to eat", "Nous allons voyager — We're going to travel"],
      },
    ],
  },
  {
    id: "fr-grammar-b1",
    languageId: "fr",
    level: "B1",
    title: "Getting Comfortable",
    sections: [
      {
        heading: "Passé Composé vs. Imparfait",
        body: "Passé composé for completed one-time events; imparfait for ongoing or habitual past states.",
        examples: ["J'ai mangé — I ate (once, done)", "Je mangeais — I was eating / used to eat"],
      },
      {
        heading: "Object Pronouns",
        body: "me, te, le/la, nous, vous, les — go directly before the conjugated verb.",
        examples: ["Je le vois — I see it/him", "Je t'aime — I love you"],
      },
      {
        heading: "Reflexive Verbs",
        body: "For actions done to oneself; the pronoun changes with the subject.",
        examples: ["se lever → je me lève, tu te lèves, il se lève..."],
      },
      {
        heading: "Comparatives",
        body: "plus...que (more than), moins...que (less than), aussi...que (as...as).",
        examples: ["plus rapide que — faster than", "aussi grand que — as tall as"],
      },
      {
        heading: "Subjunctive (Intro)",
        body: "Triggered by necessity, wish, or emotion followed by 'que'.",
        examples: ["Il faut que tu viennes — You must come"],
      },
    ],
  },
];
