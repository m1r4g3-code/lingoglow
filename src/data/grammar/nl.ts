import type { GrammarSheet } from "../../types";

export const nlGrammar: GrammarSheet[] = [
  {
    id: "nl-grammar-a1",
    languageId: "nl",
    level: "A1",
    title: "Dutch Basics",
    sections: [
      {
        heading: "De & Het: Grammatical Gender",
        body: "Dutch nouns take one of two articles: 'de' (for most masculine and feminine nouns, about two-thirds of all nouns) or 'het' (for neuter nouns, including all diminutives ending in -je). There's no reliable rule for which word gets which — it's largely memorized per noun. The indefinite article 'een' (a/an) works for both.",
        examples: ["de man — the man", "de vrouw — the woman", "het huis — the house", "het kind — the child", "een hond — a dog"],
      },
      {
        heading: "Subject Pronouns",
        body: "ik, jij/u (informal/formal 'you'), hij/zij/het, wij, jullie, zij. 'U' is the polite form used with strangers, elders, or in formal settings.",
        examples: ["Ik spreek Nederlands — I speak Dutch", "Zij is mijn zus — She is my sister"],
      },
      {
        heading: "Regular Present-Tense Verbs",
        body: "Take the stem (infinitive minus -en) and add nothing for 'ik', -t for jij/hij/zij/het, and keep the full infinitive for wij/jullie/zij. If 'jij' comes after the verb (as in a question), drop the -t.",
        examples: [
          "werken → ik werk, jij werkt, hij werkt, wij werken, jullie werken, zij werken",
          "Werk jij? — Do you work? (no -t when jij follows)",
        ],
      },
      {
        heading: "Zijn & Hebben (to be / to have)",
        body: "The two most common verbs in Dutch are both irregular and must be learned by heart — they appear in nearly every sentence.",
        examples: [
          "zijn → ik ben, jij bent, hij is, wij zijn, jullie zijn, zij zijn",
          "hebben → ik heb, jij hebt, hij heeft, wij hebben, jullie hebben, zij hebben",
        ],
      },
    ],
  },
  {
    id: "nl-grammar-a2",
    languageId: "nl",
    level: "A2",
    title: "Word Order & Building Sentences",
    sections: [
      {
        heading: "Verb-Second (V2) Word Order",
        body: "In main clauses, the conjugated verb must always be the second element — not necessarily the second word. If a sentence starts with something other than the subject (like a time word), the subject and verb swap places.",
        examples: [
          "Ik ga morgen naar school — I go to school tomorrow",
          "Morgen ga ik naar school — Tomorrow I go to school (verb stays in position 2)",
        ],
      },
      {
        heading: "Plural Formation",
        body: "Most nouns add -en; many short nouns ending in a single vowel + consonant add -s instead, especially after unstressed syllables like -el, -em, -en, -er, or a vowel.",
        examples: ["hond → honden", "boek → boeken", "tafel → tafels", "auto → auto's"],
      },
      {
        heading: "Negation with 'niet' and 'geen'",
        body: "'Niet' negates verbs, adjectives, and most sentences; it usually goes at the end or right before what it negates. 'Geen' replaces 'een' or an unmarked noun to mean 'no/not any'.",
        examples: ["Ik versta het niet — I don't understand it", "Ik heb geen tijd — I have no time"],
      },
      {
        heading: "Modal Verbs + Infinitive",
        body: "Modals like willen (want), kunnen (can), moeten (must) are conjugated, and the second verb goes to the end of the clause as a plain infinitive.",
        examples: ["Ik wil Nederlands spreken — I want to speak Dutch", "Wij moeten nu gaan — We must go now"],
      },
    ],
  },
];
