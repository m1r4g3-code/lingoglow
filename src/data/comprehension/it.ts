import type { ComprehensionPassage } from "../../types";

export const itComprehension: ComprehensionPassage[] = [
  {
    id: "it-comp-family",
    languageId: "it",
    level: "A1",
    title: "La mia famiglia",
    text: "Ciao, mi chiamo Sofia. Ho una famiglia grande. Mio padre si chiama Marco e mia madre si chiama Giulia. Ho un fratello e una sorella. La nostra casa è piccola ma bella. Ci piace mangiare pane e formaggio la mattina.",
    questions: [
      { prompt: "Come si chiama il padre di Sofia?", choices: ["Marco", "Giulia", "Sofia", "Paolo"], correctIndex: 0 },
      {
        prompt: "Com'è la casa?",
        choices: ["Grande e brutta", "Piccola ma bella", "Nuova e cara", "Vecchia"],
        correctIndex: 1,
      },
      {
        prompt: "Cosa mangiano la mattina?",
        choices: ["Riso e pesce", "Uovo e latte", "Pane e formaggio", "Frutta"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "it-comp-park",
    languageId: "it",
    level: "A1",
    title: "Un giorno al parco",
    text: "Oggi c'è il sole. Vado al parco con il mio cane. Il mio cane è nero e molto veloce. Nel parco vedo un gatto grigio e molti uccelli. Dopo ho fame e mangio una mela.",
    questions: [
      {
        prompt: "Che tempo fa oggi?",
        choices: ["Fa freddo", "Piove", "C'è il sole", "C'è un temporale"],
        correctIndex: 2,
      },
      { prompt: "Di che colore è il cane?", choices: ["Bianco", "Nero", "Marrone", "Grigio"], correctIndex: 1 },
      { prompt: "Cosa mangia dopo?", choices: ["Pane", "Formaggio", "Una mela", "Riso"], correctIndex: 2 },
    ],
  },
  {
    id: "it-comp-restaurant",
    languageId: "it",
    level: "A2",
    title: "Al ristorante",
    text: "Vado al ristorante con il mio amico. Il cameriere ci porta il menù. Io voglio pollo con riso, e il mio amico vuole pesce. Abbiamo sete, quindi ordiniamo acqua. Il cibo è delizioso. Alla fine, chiediamo il conto e paghiamo con la carta.",
    questions: [
      {
        prompt: "Cosa vuole mangiare chi parla?",
        choices: ["Pesce", "Pollo con riso", "Formaggio", "Frutta"],
        correctIndex: 1,
      },
      { prompt: "Cosa ordinano da bere?", choices: ["Caffè", "Latte", "Acqua", "Niente"], correctIndex: 2 },
      { prompt: "Come pagano?", choices: ["In contanti", "Con la carta", "Non pagano", "Con assegno"], correctIndex: 1 },
    ],
  },
];
