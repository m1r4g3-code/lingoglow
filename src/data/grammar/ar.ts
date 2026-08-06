import type { GrammarSheet } from "../../types";

export const arGrammar: GrammarSheet[] = [
  {
    id: "ar-grammar-a1",
    languageId: "ar",
    level: "A1",
    title: "Arabic Basics",
    sections: [
      {
        heading: "The Definite Article ال",
        body: "Arabic has no word for 'a/an' — nouns are simply indefinite by default. To make a noun definite, prefix ال (al-) directly onto it, with no space. Before 'sun letters' (like ت، ث، د، ر، ز، س، ش، ص، ض، ط، ظ، ل، ن) the ل assimilates in pronunciation, doubling the following consonant instead — the spelling stays the same either way.",
        examples: ["كتاب — a book", "الكتاب — the book (al-kitab)", "بيت — a house", "البيت — the house (al-bayt)", "شمس — a sun", "الشمس — the sun (pronounced ash-shams, not al-shams)"],
      },
      {
        heading: "Gender of Nouns",
        body: "Every noun is masculine or feminine. Most feminine nouns end in ة (taa marbuta); nouns without that ending are usually masculine. Adjectives and verbs must agree with the noun's gender.",
        examples: ["كتاب — book (masculine)", "سيارة — car (feminine)", "معلم — teacher, male", "معلمة — teacher, female"],
      },
      {
        heading: "Sentences Without 'To Be'",
        body: "In the present tense, Arabic doesn't use a verb for 'is/am/are' in simple statements. You just place the subject next to the predicate — this is called a nominal sentence.",
        examples: ["أنا سعيد — I am happy (literally 'I happy')", "هو طالب — he is a student", "البيت كبير — the house is big"],
      },
      {
        heading: "Word Order",
        body: "Arabic allows both verb-first (VSO) and subject-first (SVO) order in verbal sentences; both are correct and SVO is common in speech and for emphasis.",
        examples: ["ذهب أحمد إلى المدرسة — Ahmad went to school (VSO)", "أحمد ذهب إلى المدرسة — Ahmad went to school (SVO, more emphatic on 'Ahmad')"],
      },
    ],
  },
  {
    id: "ar-grammar-a2",
    languageId: "ar",
    level: "A2",
    title: "Building Sentences",
    sections: [
      {
        heading: "Plural Patterns",
        body: "Masculine sound plurals add ون؛ feminine sound plurals add ات. Many common nouns instead take a 'broken plural' — an irregular internal vowel change you have to learn per word.",
        examples: ["معلم → معلمون — teacher → teachers (m.)", "معلمة → معلمات — teacher → teachers (f.)", "كتاب → كتب — book → books (broken plural)"],
      },
      {
        heading: "Question Words",
        body: "Content questions start with a question word. For yes/no questions, add هل to the very front of the sentence — the word order after it doesn't change.",
        examples: ["هل أنت طالب؟ — Are you a student?", "أين البيت؟ — Where is the house?", "ماذا تريد؟ — What do you want?"],
      },
      {
        heading: "Possession: The Idafa Construction",
        body: "To show possession ('the X of Y'), simply place two nouns next to each other — no separate word for 'of'. The first noun drops its ال even when the whole phrase is definite.",
        examples: ["بيت الرجل — the man's house (literally 'house-of the-man')", "كتاب الطالب — the student's book", "اسم أبي — my father's name"],
      },
      {
        heading: "Adjective Agreement",
        body: "Adjectives follow the noun they describe and must match its gender, number, and definiteness (an adjective describing a definite noun also takes ال).",
        examples: ["بيت كبير — a big house", "بيت جميل — a beautiful house", "السيارة الحمراء — the red car (both words definite, both feminine)"],
      },
    ],
  },
];
