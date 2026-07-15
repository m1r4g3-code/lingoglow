import type { GrammarSheet } from "../../types";

export const esGrammar: GrammarSheet[] = [
  {
    id: "es-grammar-a1",
    languageId: "es",
    level: "A1",
    title: "Spanish Basics",
    sections: [
      {
        heading: "Gender & Articles",
        body: "Every noun is masculine or feminine. 'El'/'un' go with masculine nouns, 'la'/'una' with feminine. Most nouns ending in -o are masculine, -a are feminine (with exceptions).",
        examples: ["el libro — the book", "la mesa — the table", "un perro — a dog", "una casa — a house"],
      },
      {
        heading: "Plural Formation",
        body: "Add -s after a vowel, -es after a consonant.",
        examples: ["libro → libros", "ciudad → ciudades", "papel → papeles"],
      },
      {
        heading: "Subject Pronouns",
        body: "yo, tú, él/ella/usted, nosotros/as, vosotros/as, ellos/ellas/ustedes.",
        examples: ["Yo hablo — I speak", "Ella come — She eats"],
      },
      {
        heading: "Ser vs. Estar",
        body: "Both mean 'to be'. Ser is for permanent traits and identity; estar is for temporary states and location.",
        examples: ["Soy alto — I am tall (permanent)", "Estoy cansado — I am tired (temporary)", "Estoy en casa — I am at home"],
      },
      {
        heading: "Negation",
        body: "Put 'no' directly before the verb.",
        examples: ["No hablo francés — I don't speak French"],
      },
    ],
  },
  {
    id: "es-grammar-a2",
    languageId: "es",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Regular Present-Tense Verbs",
        body: "Verbs fall into three families by their infinitive ending: -AR, -ER, -IR.",
        examples: [
          "hablar → hablo, hablas, habla, hablamos, habláis, hablan",
          "comer → como, comes, come, comemos, coméis, comen",
          "vivir → vivo, vives, vive, vivimos, vivís, viven",
        ],
      },
      {
        heading: "Adjective Agreement",
        body: "Adjectives match the gender and number of the noun they describe, usually placed after it.",
        examples: ["el coche rojo — the red car", "la casa roja — the red house", "los coches rojos — the red cars"],
      },
      {
        heading: "Asking Questions",
        body: "Wrap the sentence in inverted (¿) and regular (?) question marks; question words go first.",
        examples: ["¿Dónde vives? — Where do you live?", "¿Qué hora es? — What time is it?"],
      },
      {
        heading: "Possessives",
        body: "mi/mis, tu/tus, su/sus, nuestro/a(s) — they agree in number with what's owned.",
        examples: ["mi casa — my house", "nuestros amigos — our friends"],
      },
      {
        heading: "Near Future: ir + a + infinitive",
        body: "The easiest way to talk about the future.",
        examples: ["Voy a comer — I'm going to eat", "Vamos a viajar — We're going to travel"],
      },
    ],
  },
  {
    id: "es-grammar-b1",
    languageId: "es",
    level: "B1",
    title: "Getting Comfortable",
    sections: [
      {
        heading: "Preterite vs. Imperfect",
        body: "Two past tenses: preterite for completed one-time actions, imperfect for ongoing or habitual past states.",
        examples: ["Comí — I ate (once, done)", "Comía — I was eating / used to eat"],
      },
      {
        heading: "Object Pronouns",
        body: "me, te, lo/la, nos, os, los/las replace direct objects; go before a conjugated verb.",
        examples: ["Lo veo — I see it/him", "Te quiero — I love you"],
      },
      {
        heading: "Reflexive Verbs",
        body: "Used for actions done to oneself; the pronoun changes with the subject.",
        examples: ["levantarse → me levanto, te levantas, se levanta, nos levantamos..."],
      },
      {
        heading: "Comparatives",
        body: "más...que (more than), menos...que (less than), tan...como (as...as).",
        examples: ["más rápido que — faster than", "tan alto como — as tall as"],
      },
      {
        heading: "Subjunctive (Intro)",
        body: "Triggered by expressions of wish, doubt, or emotion followed by 'que'.",
        examples: ["Quiero que vengas — I want you to come"],
      },
    ],
  },
];
