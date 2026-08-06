import type { ComprehensionPassage } from "../../types";

export const deComprehension: ComprehensionPassage[] = [
  {
    id: "de-comp-family",
    languageId: "de",
    level: "A1",
    title: "Meine Familie",
    text: "Hallo, ich heiße Lena. Ich habe eine große Familie. Mein Vater heißt Peter und meine Mutter heißt Julia. Ich habe einen Bruder und eine Schwester. Unser Haus ist klein, aber schön. Wir essen morgens gern Brot und Käse.",
    questions: [
      { prompt: "Wie heißt der Vater von Lena?", choices: ["Peter", "Julia", "Lena", "Thomas"], correctIndex: 0 },
      {
        prompt: "Wie ist das Haus?",
        choices: ["Groß und hässlich", "Klein, aber schön", "Neu und teuer", "Alt"],
        correctIndex: 1,
      },
      {
        prompt: "Was essen sie morgens?",
        choices: ["Reis und Fisch", "Ei und Milch", "Brot und Käse", "Obst"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "de-comp-park",
    languageId: "de",
    level: "A1",
    title: "Ein Tag im Park",
    text: "Heute scheint die Sonne. Ich gehe mit meinem Hund in den Park. Mein Hund ist schwarz und sehr schnell. Im Park sehe ich eine graue Katze und viele Vögel. Danach habe ich Hunger und esse einen Apfel.",
    questions: [
      {
        prompt: "Wie ist das Wetter heute?",
        choices: ["Es ist kalt", "Es regnet", "Die Sonne scheint", "Es gibt ein Gewitter"],
        correctIndex: 2,
      },
      { prompt: "Welche Farbe hat der Hund?", choices: ["Weiß", "Schwarz", "Braun", "Grau"], correctIndex: 1 },
      { prompt: "Was isst er danach?", choices: ["Brot", "Käse", "Einen Apfel", "Reis"], correctIndex: 2 },
    ],
  },
  {
    id: "de-comp-restaurant",
    languageId: "de",
    level: "A2",
    title: "Im Restaurant",
    text: "Ich gehe mit meinem Freund in ein Restaurant. Der Kellner bringt uns die Speisekarte. Ich möchte Huhn mit Reis, und mein Freund möchte Fisch. Wir haben Durst, also bestellen wir Wasser. Das Essen ist lecker. Am Ende bezahlen wir mit Karte.",
    questions: [
      {
        prompt: "Was möchte der Sprecher essen?",
        choices: ["Fisch", "Huhn mit Reis", "Käse", "Obst"],
        correctIndex: 1,
      },
      { prompt: "Was bestellen sie zu trinken?", choices: ["Kaffee", "Milch", "Wasser", "Nichts"], correctIndex: 2 },
      { prompt: "Wie bezahlen sie?", choices: ["Bar", "Mit Karte", "Sie bezahlen nicht", "Mit Scheck"], correctIndex: 1 },
    ],
  },
];
