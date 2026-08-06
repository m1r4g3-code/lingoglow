import type { ComprehensionPassage } from "../../types";

// Standard Boko (Latin-script) Hausa orthography is used throughout, including
// the special letters ɓ, ɗ, ƙ and the glottal-stop apostrophe (ʼ), matching
// src/data/lessons/ha.ts.
export const haComprehension: ComprehensionPassage[] = [
  {
    id: "ha-comp-family",
    languageId: "ha",
    level: "A1",
    title: "Iyalina",
    text: "Sannu! Sunana Amina. Ina da babban iyali. Sunan mahaifina Bello ne, sunan mahaifiyata kuma Zainab ce. Ina da ɗan'uwa ɗaya da 'yar'uwa ɗaya. Gidanmu ƙarami ne amma yana da kyau. Muna cin gurasa da cuku da safe.",
    questions: [
      { prompt: "Menene sunan mahaifin Amina?", choices: ["Bello", "Zainab", "Amina", "Musa"], correctIndex: 0 },
      {
        prompt: "Yaya gidan Amina yake?",
        choices: ["Babba amma tsohuwa", "Ƙarami amma yana da kyau", "Sabo kuma tsada", "Babba sosai"],
        correctIndex: 1,
      },
      {
        prompt: "Me suke ci da safe?",
        choices: ["Shinkafa da kifi", "Kwai da madara", "Gurasa da cuku", "'Ya'yan itace"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "ha-comp-park",
    languageId: "ha",
    level: "A1",
    title: "Yini a wurin shakatawa",
    text: "Yau rana tana da kyau. Ina tafiya wurin shakatawa tare da karena. Karena baƙi ne kuma mai sauri sosai. A wurin shakatawa, na ga wata kyanwa mai launin toka da tsuntsaye da yawa. Daga baya, ina jin yunwa, sai na ci tuffa ɗaya.",
    questions: [
      {
        prompt: "Yaya yanayin yau yake?",
        choices: ["Sanyi", "Ana ruwan sama", "Rana tana da kyau", "Akwai hadari"],
        correctIndex: 2,
      },
      { prompt: "Wane launi ne karen?", choices: ["Fari", "Baƙi", "Ruwan ƙasa", "Toka"], correctIndex: 1 },
      { prompt: "Me ya ci daga baya?", choices: ["Gurasa", "Cuku", "Tuffa ɗaya", "Shinkafa"], correctIndex: 2 },
    ],
  },
  {
    id: "ha-comp-work",
    languageId: "ha",
    level: "A2",
    title: "Aikina",
    text: "Ni likita ne, ina aiki a wani babban asibiti. Kowace rana ina magana da marasa lafiya da yawa. Aikina yana da wahala, amma ina son taimaka wa mutane. Bayan aiki, ina jin gajiya kuma ina son hutawa a gida.",
    questions: [
      {
        prompt: "Ina likitan yake aiki?",
        choices: ["A makaranta", "A wani babban asibiti", "A shago", "A gidan abinci"],
        correctIndex: 1,
      },
      {
        prompt: "Da wa yake magana kowace rana?",
        choices: ["Da ɗalibai", "Da abokan ciniki", "Da marasa lafiya", "Da abokai"],
        correctIndex: 2,
      },
      {
        prompt: "Yaya yake ji bayan aiki?",
        choices: ["Farin ciki", "Gajiya", "Kewa", "Fushi"],
        correctIndex: 1,
      },
    ],
  },
];
