import type { ComprehensionPassage } from "../../types";

export const nlComprehension: ComprehensionPassage[] = [
  {
    id: "nl-comp-family",
    languageId: "nl",
    level: "A1",
    title: "Mijn familie",
    text: "Hallo, ik heet Anna. Ik heb een grote familie. Mijn vader heet Jan en mijn moeder heet Marieke. Ik heb een broer en een zus. Ons huis is klein maar mooi. We eten graag brood en kaas in de ochtend.",
    questions: [
      { prompt: "Hoe heet de vader van Anna?", choices: ["Jan", "Marieke", "Anna", "Pieter"], correctIndex: 0 },
      {
        prompt: "Hoe is het huis van Anna?",
        choices: ["Groot en lelijk", "Klein maar mooi", "Nieuw en duur", "Oud"],
        correctIndex: 1,
      },
      {
        prompt: "Wat eten ze graag in de ochtend?",
        choices: ["Rijst en vis", "Ei en melk", "Brood en kaas", "Fruit"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "nl-comp-park",
    languageId: "nl",
    level: "A1",
    title: "Een dag in het park",
    text: "Vandaag schijnt de zon. Ik ga naar het park met mijn hond. Mijn hond is zwart en heel snel. In het park zie ik een grijze kat en veel vogels. Daarna heb ik honger en eet ik een appel.",
    questions: [
      {
        prompt: "Wat voor weer is het vandaag?",
        choices: ["Het is koud", "Het regent", "De zon schijnt", "Er is storm"],
        correctIndex: 2,
      },
      { prompt: "Welke kleur heeft de hond?", choices: ["Wit", "Zwart", "Bruin", "Grijs"], correctIndex: 1 },
      { prompt: "Wat eet de spreker daarna?", choices: ["Brood", "Kaas", "Een appel", "Rijst"], correctIndex: 2 },
    ],
  },
  {
    id: "nl-comp-work",
    languageId: "nl",
    level: "A2",
    title: "Mijn werk",
    text: "Ik ben leraar en ik werk op een school in Amsterdam. Elke dag spreek ik met veel kinderen. Mijn werk is soms moeilijk, maar ik help graag anderen. Na het werk ben ik moe en wil ik thuis rusten. Morgen ga ik weer vroeg naar school.",
    questions: [
      {
        prompt: "Waar werkt de spreker?",
        choices: ["In een ziekenhuis", "Op een school", "In een winkel", "In een restaurant"],
        correctIndex: 1,
      },
      {
        prompt: "Met wie spreekt de spreker elke dag?",
        choices: ["Met studenten", "Met klanten", "Met kinderen", "Met vrienden"],
        correctIndex: 2,
      },
      {
        prompt: "Hoe voelt de spreker zich na het werk?",
        choices: ["Blij", "Moe", "Verveeld", "Boos"],
        correctIndex: 1,
      },
    ],
  },
];
