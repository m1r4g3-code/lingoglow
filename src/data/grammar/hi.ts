import type { GrammarSheet } from "../../types";

export const hiGrammar: GrammarSheet[] = [
  {
    id: "hi-grammar-a1",
    languageId: "hi",
    level: "A1",
    title: "Hindi Basics",
    sections: [
      {
        heading: "Devanagari Script & No Articles",
        body: "Hindi is written in the Devanagari script, left to right, with most letters hanging from a horizontal headline (शिरोरेखा). Hindi has no words for 'a' or 'the' — English articles have no direct equivalent, so context tells you whether a noun is definite or indefinite.",
        examples: ["किताब — a book / the book", "घर — a house / the house"],
      },
      {
        heading: "Noun Gender",
        body: "Every Hindi noun is grammatically masculine or feminine, even for objects with no natural gender. Gender is often (not always) predictable from the ending — nouns ending in -आ are usually masculine, -ई often feminine — and adjectives change their own ending to agree.",
        examples: ["लड़का (m) — boy", "लड़की (f) — girl", "अच्छा लड़का — good boy", "अच्छी लड़की — good girl"],
      },
      {
        heading: "Present Habitual Tense (Verb + है/हैं)",
        body: "An ordinary present-tense verb has two parts: a participle that agrees with the subject's gender and number (-ता masc., -ती fem., -ते masc. plural), plus a form of होना (है/हैं) for person and number. This gender agreement is a real, everyday feature of Hindi — a man says करता है, a woman says करती है, for the exact same meaning.",
        examples: ["वह पढ़ता है — He reads", "वह पढ़ती है — She reads", "वे पढ़ते हैं — They read"],
      },
      {
        heading: "Word Order: Subject–Object–Verb",
        body: "Unlike English (SVO), Hindi sentences put the verb last, after the object.",
        examples: ["मैं पानी पीता हूँ — I drink water (lit. I water drink)", "वह किताब पढ़ती है — She reads a book (lit. she book reads)"],
      },
    ],
  },
  {
    id: "hi-grammar-a2",
    languageId: "hi",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Postpositions Instead of Prepositions",
        body: "Hindi uses postpositions — small words placed after the noun — instead of prepositions placed before it. The most common are में (in), पर (on), से (from/with), and को (to / object marker).",
        examples: ["घर में — in the house", "मेज़ पर — on the table", "स्कूल से — from school", "मुझको / मुझे — to me"],
      },
      {
        heading: "Personal Pronouns & Politeness",
        body: "Hindi has three words for 'you': तू (very informal, intimate), तुम (informal, familiar), and आप (formal/respectful). Use आप with strangers, elders, and anyone you want to show respect to.",
        examples: ["तुम कैसे हो? — How are you? (informal)", "आप कैसे हैं? — How are you? (formal)"],
      },
      {
        heading: "Plural Formation",
        body: "Masculine nouns ending in -आ change to -ए in the plural; most feminine nouns add -एँ, and feminine nouns ending in -ई take -याँ. The verb switches to plural agreement to match.",
        examples: ["लड़का → लड़के — boy → boys", "किताब → किताबें — book → books", "लड़की → लड़कियाँ — girl → girls"],
      },
      {
        heading: "Negation",
        body: "Place नहीं before the verb (or before है/हैं) to negate a sentence.",
        examples: ["मैं नहीं जाता — I don't go", "यह सही नहीं है — This isn't correct"],
      },
    ],
  },
];
