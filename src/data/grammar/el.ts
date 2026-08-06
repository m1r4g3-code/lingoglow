import type { GrammarSheet } from "../../types";

export const elGrammar: GrammarSheet[] = [
  {
    id: "el-grammar-a1",
    languageId: "el",
    level: "A1",
    title: "Greek Basics",
    sections: [
      {
        heading: "Gender & the Definite Article",
        body: "Greek nouns are masculine, feminine, or neuter, and the definite article changes to match: ο for masculine, η for feminine, το for neuter. The ending of a noun is a strong hint to its gender, though there are exceptions.",
        examples: ["ο άντρας — the man", "η γυναίκα — the woman", "το παιδί — the child", "ο καφές — the coffee"],
      },
      {
        heading: "Present Tense: -ω Verbs",
        body: "Most verbs end in -ω in the dictionary form. Drop -ω and add the ending for each person: -ω, -εις, -ει, -ουμε, -ετε, -ουν(ε).",
        examples: ["κάνω → κάνω, κάνεις, κάνει, κάνουμε, κάνετε, κάνουν", "Κάνω τα μαθήματά μου — I do my homework"],
      },
      {
        heading: "Personal Pronouns",
        body: "εγώ, εσύ, αυτός/αυτή/αυτό, εμείς, εσείς, αυτοί/αυτές/αυτά. Verb endings already show who's doing the action, so pronouns are usually dropped unless you want emphasis.",
        examples: ["(Εγώ) μιλάω ελληνικά — I speak Greek", "Αυτή είναι δασκάλα — She is a teacher"],
      },
      {
        heading: "Negation",
        body: "Put δεν directly before the verb to negate a sentence.",
        examples: ["Δεν καταλαβαίνω — I don't understand", "Δεν έχω χρόνο — I don't have time"],
      },
    ],
  },
  {
    id: "el-grammar-a2",
    languageId: "el",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Asking Questions",
        body: "Question words come first, and Greek uses a semicolon (;) as its question mark instead of ?.",
        examples: ["Πού μένεις; — Where do you live?", "Τι ώρα είναι; — What time is it?"],
      },
      {
        heading: "Plural Formation",
        body: "Plurals depend on gender: masculine -ος becomes -οι, feminine -α/-η becomes -ες, neuter -ο becomes -α, and neuter -ι becomes -ια.",
        examples: ["ο φίλος → οι φίλοι — friend → friends", "η μέρα → οι μέρες — day → days", "το βιβλίο → τα βιβλία — book → books"],
      },
      {
        heading: "Adjective Agreement",
        body: "Adjectives change their ending to match the gender and number of the noun they describe, and usually come before it.",
        examples: ["καλός φίλος — good friend (masc.)", "καλή φίλη — good friend (fem.)", "καλό παιδί — good child (neut.)"],
      },
      {
        heading: "Possessive Pronouns",
        body: "μου, σου, του/της, μας, σας, τους attach right after the noun (and its article) to show possession.",
        examples: ["το σπίτι μου — my house", "ο φίλος σου — your friend", "η μητέρα μας — our mother"],
      },
    ],
  },
];
