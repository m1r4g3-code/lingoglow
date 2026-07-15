import type { GrammarSheet } from "../../types";

export const laGrammar: GrammarSheet[] = [
  {
    id: "la-grammar-a1",
    languageId: "la",
    level: "A1",
    title: "Latin Basics",
    sections: [
      {
        heading: "Noun Cases (Overview)",
        body: "Latin nouns change form (decline) based on their grammatical role: nominative (subject), genitive (possession, 'of'), dative (indirect object, 'to/for'), accusative (direct object), ablative (by/with/from). Because case endings show the role, word order is flexible.",
        examples: ["Puella librum legit — The girl reads the book (word order could vary and still mean the same)"],
      },
      {
        heading: "First Declension (-a nouns, mostly feminine)",
        body: "puella (girl): puella, puellae, puellae, puellam, puella.",
        examples: ["puella — girl (nom.)", "puellam — girl (acc., direct object)"],
      },
      {
        heading: "Second Declension (-us/-um nouns)",
        body: "dominus (master): dominus, domini, domino, dominum, domino.",
        examples: ["dominus — master (nom.)", "dominum — master (acc.)"],
      },
      {
        heading: "Present Tense of 'esse' (to be)",
        body: "The most important irregular verb.",
        examples: ["sum, es, est, sumus, estis, sunt"],
      },
      {
        heading: "Basic Word Order",
        body: "Latin often places the verb at the end (Subject-Object-Verb), but this is a tendency, not a rule.",
        examples: ["Puella librum legit — The girl reads the book"],
      },
    ],
  },
  {
    id: "la-grammar-a2",
    languageId: "la",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "First & Second Conjugation Present Tense",
        body: "Verbs group into conjugations by their infinitive ending.",
        examples: [
          "amare (1st) → amo, amas, amat, amamus, amatis, amant",
          "habēre (2nd) → habeo, habes, habet, habemus, habetis, habent",
        ],
      },
      {
        heading: "Adjective Agreement",
        body: "Adjectives agree with the noun they describe in case, number, and gender.",
        examples: ["puella bona — good girl", "dominus bonus — good master"],
      },
      {
        heading: "Third Declension (Consonant Stems)",
        body: "rex, regis (king): rex, regis, regi, regem, rege.",
        examples: ["rex — king (nom.)", "regem — king (acc.)"],
      },
      {
        heading: "Prepositions & Case",
        body: "Some prepositions take different cases depending on meaning: 'in' + ablative means location, 'in' + accusative means motion toward.",
        examples: ["in urbe — in the city (ablative, location)", "in urbem — into the city (accusative, motion)"],
      },
      {
        heading: "Negation",
        body: "'Non' before the verb.",
        examples: ["Non video — I do not see"],
      },
    ],
  },
  {
    id: "la-grammar-b1",
    languageId: "la",
    level: "B1",
    title: "Getting Comfortable",
    sections: [
      {
        heading: "Perfect Tense",
        body: "Describes a completed action — 'I loved' or 'I have loved'.",
        examples: ["amavi, amavisti, amavit, amavimus, amavistis, amaverunt"],
      },
      {
        heading: "Third & Fourth Conjugation",
        body: "More verb families to recognize.",
        examples: ["regere (3rd) → rego, regis, regit...", "audire (4th) → audio, audis, audit..."],
      },
      {
        heading: "Ablative Absolute",
        body: "A participial phrase grammatically independent from the main clause, common in narrative Latin.",
        examples: ["Urbe capta, milites discesserunt — The city having been captured, the soldiers left"],
      },
      {
        heading: "Passive Voice (Present)",
        body: "The action happens to the subject rather than being done by it.",
        examples: ["amor, amaris, amatur, amamur, amamini, amantur — 'I am loved', etc."],
      },
      {
        heading: "Subjunctive: Purpose Clauses",
        body: "'ut' + subjunctive expresses purpose ('in order to').",
        examples: ["Venit ut videat — He comes in order to see"],
      },
    ],
  },
];
