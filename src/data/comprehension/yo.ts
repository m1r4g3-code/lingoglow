import type { ComprehensionPassage } from "../../types";

// Standard Yorùbá orthography with tone marks and underdots is used
// throughout, matching src/data/lessons/yo.ts. Diacritics are load-bearing —
// they are part of correct spelling, not optional styling.
export const yoComprehension: ComprehensionPassage[] = [
  {
    id: "yo-comp-family",
    languageId: "yo",
    level: "A1",
    title: "Ìdílé mi",
    text: "Bawo, orúkọ mi ni Adùnní. Mo ní ìdílé ńlá. Orúkọ bàbá mi ni Adé, orúkọ ìyá mi sì ni Ṣadé. Mo ní arákùnrin kan àti arábìnrin kan. Ilé wa kéré ṣùgbọ́n ó dára. A máa ń jẹ búrẹ́dì àti wàràà ní òwúrọ̀.",
    questions: [
      { prompt: "Kí ni orúkọ bàbá Adùnní?", choices: ["Adé", "Ṣadé", "Adùnní", "Kúnlé"], correctIndex: 0 },
      {
        prompt: "Báwo ni ilé wọn ṣe rí?",
        choices: ["Ńlá àti burúkú", "Kéré ṣùgbọ́n ó dára", "Tuntun àti wọ́n", "Ó ti gbó"],
        correctIndex: 1,
      },
      {
        prompt: "Kí ni wọ́n máa ń jẹ ní òwúrọ̀?",
        choices: ["Ìrẹsì àti ẹja", "Ẹyin àti wàrà", "Búrẹ́dì àti wàràà", "Èso"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "yo-comp-park",
    languageId: "yo",
    level: "A1",
    title: "Ọjọ́ kan ní ọgbà ìtura",
    text: "Òní oòrùn ń tàn. Mo lọ sí ọgbà ìtura pẹ̀lú ajá mi. Ajá mi jẹ́ dúdú, ó sì yára gan-an. Ní ọgbà ìtura, mo rí ológbò aláwọ̀ eérú àti ọ̀pọ̀lọpọ̀ ẹyẹ. Lẹ́yìn náà, ebi ń pa mí, mo sì jẹ ápù kan.",
    questions: [
      {
        prompt: "Báwo ni ojú-ọjọ́ ṣe rí lónìí?",
        choices: ["Òtútù ni", "Òjò ń rọ̀", "Oòrùn ń tàn", "Ìjì ń jà"],
        correctIndex: 2,
      },
      { prompt: "Àwọ̀ wo ni ajá náà?", choices: ["Funfun", "Dúdú", "Aláwọ̀ búráùn", "Eérú"], correctIndex: 1 },
      {
        prompt: "Kí ni ó jẹ lẹ́yìn náà?",
        choices: ["Búrẹ́dì", "Wàràà", "Ápù kan", "Ìrẹsì"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "yo-comp-work",
    languageId: "yo",
    level: "A2",
    title: "Iṣẹ́ mi",
    text: "Mo jẹ́ olùkọ́, mo sì ń ṣiṣẹ́ ní ilé-ìwé kan ní Èkó. Ojoojúmọ́, mo máa ń bá ọ̀pọ̀ ọmọdé sọ̀rọ̀. Iṣẹ́ mi le nígbà mìíràn, ṣùgbọ́n mo nífẹ̀ẹ́ láti ràn àwọn ẹlòmíràn lọ́wọ́. Lẹ́yìn iṣẹ́, ara mi máa ń rẹ̀ mí, mo sì máa ń fẹ́ sinmi ní ilé.",
    questions: [
      {
        prompt: "Níbo ni ó ti ń ṣiṣẹ́?",
        choices: ["Ní ilé-ìwòsàn", "Ní ilé-ìwé", "Ní ilé-ìtajà", "Ní ilé-oúnjẹ"],
        correctIndex: 1,
      },
      {
        prompt: "Ta ni ó máa ń bá sọ̀rọ̀ lójoojúmọ́?",
        choices: ["Àwọn akẹ́kọ̀ọ́ yunifásítì", "Àwọn oníbàárà", "Àwọn ọmọdé", "Àwọn ọ̀rẹ́"],
        correctIndex: 2,
      },
      {
        prompt: "Báwo ni ara rẹ̀ ṣe rí lẹ́yìn iṣẹ́?",
        choices: ["Inú rẹ̀ dùn", "Ó rẹ̀ ẹ́", "Inú bí i", "Ó ń bẹ̀rù"],
        correctIndex: 1,
      },
    ],
  },
];
