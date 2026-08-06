import type { GrammarSheet } from "../../types";

// Standard Boko (Latin-script) Hausa orthography is used throughout, including
// the special letters ɓ, ɗ, ƙ and the glottal-stop apostrophe (ʼ), matching
// src/data/lessons/ha.ts.
export const haGrammar: GrammarSheet[] = [
  {
    id: "ha-grammar-a1",
    languageId: "ha",
    level: "A1",
    title: "Hausa Basics",
    sections: [
      {
        heading: "Tone",
        body: "Hausa is a tonal language: every syllable carries a high, low, or falling pitch, and pitch alone can separate two otherwise identical-looking words. Everyday Boko writing usually leaves tone unmarked, so listening carefully matters as much as reading.",
        examples: ["wuyā (high tone) — neck", "wuyà (falling tone) — difficulty, hardship"],
      },
      {
        heading: "Personal Pronouns",
        body: "The independent pronouns are ni, kai, ke, shi, ita, mu, ku, su. Note that Hausa marks the gender of 'you' (singular) — kai to a man, ke to a woman — something English doesn't do.",
        examples: ["ni — I / me", "kai — you (to a man)", "ke — you (to a woman)", "shi — he / it", "ita — she / it", "mu — we", "ku — you (plural)", "su — they"],
      },
      {
        heading: "Basic Sentence Structure",
        body: "Word order is Subject-Verb-Object, like English. To identify or classify something (X is Y), Hausa uses no verb 'to be' — instead it adds 'ne' (masculine/plural) or 'ce' (feminine) at the end of the sentence.",
        examples: ["Shi mahaifina ne — He is my father", "Ita mahaifiyata ce — She is my mother", "Ni ɗalibi ne — I am a student"],
      },
      {
        heading: "Asking Questions",
        body: "Yes/no questions rely on rising intonation (sometimes opened with the optional word 'Shin'). Content questions use words like me, wa, ina, yaushe, don me, and yaya, usually placed where the answer would go.",
        examples: ["Kana jin Turanci? — Do you speak English?", "Menene sunanka? — What is your name?", "Ina kake zaune? — Where do you live?"],
      },
    ],
  },
  {
    id: "ha-grammar-a2",
    languageId: "ha",
    level: "A2",
    title: "Pronoun-Tense Complexes",
    sections: [
      {
        heading: "Verbs Don't Conjugate — Pronouns Do",
        body: "Unlike Spanish or English, a Hausa verb stem generally stays the same no matter who does the action. Instead, the subject pronoun itself changes shape to show tense and aspect, fusing person, number, and time into one short word before the verb. The sections below show the same verb, tafi ('go'), across three of these pronoun-tense sets.",
        examples: ["Completive na tafi — I went", "Continuous ina tafiya — I am going", "Future zan tafi — I will go"],
      },
      {
        heading: "Completive (Completed Actions)",
        body: "Used for finished actions, roughly like the English past tense. The pronoun set is na, ka, kika, ya, ta, mun, kun, sun, placed directly before the bare verb.",
        examples: [
          "na tafi — I went",
          "ka tafi — you (m.) went",
          "kika tafi — you (f.) went",
          "ya tafi / ta tafi — he/she went",
          "mun tafi, kun tafi, sun tafi — we/you-pl./they went",
        ],
      },
      {
        heading: "Continuous (Ongoing Actions)",
        body: "Used for actions in progress, like English '-ing'. The pronoun set is ina, kana, kina, yana, tana, muna, kuna, suna, followed by the verbal-noun form of the verb (often ending in -wa).",
        examples: [
          "ina zuwa — I am coming",
          "kana zuwa / kina zuwa — you (m./f.) are coming",
          "yana zuwa / tana zuwa — he/she is coming",
          "muna zuwa, kuna zuwa, suna zuwa — we/you-pl./they are coming",
        ],
      },
      {
        heading: "Future & Negation",
        body: "The future pronoun set is zan, za ka, za ki, zai, za ta, za mu, za ku, za su, before the bare verb. To negate a sentence, Hausa wraps it in 'ba ... ba'; for some persons the first 'ba' fuses with the pronoun (ba + na → ban, ba + ya → bai).",
        examples: ["zan tafi gobe — I will go tomorrow", "za ta tafi — she will go", "Ban tafi ba — I didn't go", "Bai zo ba — He didn't come"],
      },
    ],
  },
];
