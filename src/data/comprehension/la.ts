import type { ComprehensionPassage } from "../../types";

export const laComprehension: ComprehensionPassage[] = [
  {
    id: "la-comp-family",
    languageId: "la",
    level: "A1",
    title: "Familia mea",
    text: "Salve, nomen mihi Anna est. Familiam magnam habeo. Pater meus Marcus vocatur, mater mea Rosa vocatur. Fratrem et sororem habeo. Domus nostra parva sed pulchra est. Mane panem et caseum edimus.",
    questions: [
      { prompt: "Quomodo pater vocatur?", choices: ["Marcus", "Rosa", "Anna", "Petrus"], correctIndex: 0 },
      {
        prompt: "Qualis est domus?",
        choices: ["Magna et foeda", "Parva sed pulchra", "Nova et cara", "Vetus"],
        correctIndex: 1,
      },
      {
        prompt: "Quid mane edunt?",
        choices: ["Oryzam et piscem", "Ovum et lac", "Panem et caseum", "Fructum"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "la-comp-park",
    languageId: "la",
    level: "A1",
    title: "Dies in horto",
    text: "Hodie sol lucet. Cum cane meo ad hortum eo. Canis meus niger et celer est. In horto, felem griseam et multas aves video. Postea esurio et malum edo.",
    questions: [
      { prompt: "Quale est tempus hodie?", choices: ["Frigidum est", "Pluit", "Sol lucet", "Tempestas est"], correctIndex: 2 },
      { prompt: "Cuius coloris est canis?", choices: ["Albus", "Niger", "Fuscus", "Griseus"], correctIndex: 1 },
      { prompt: "Quid postea edit?", choices: ["Panem", "Caseum", "Malum", "Oryzam"], correctIndex: 2 },
    ],
  },
  {
    id: "la-comp-tavern",
    languageId: "la",
    level: "A2",
    title: "In cauponia",
    text: "Cum amico meo ad cauponiam eo. Ministrator nobis cenam ostendit. Pullum cum oryza volo, amicus meus piscem vult. Sitimus, igitur aquam poscimus. Cena optima est.",
    questions: [
      {
        prompt: "Quid edere vult?",
        choices: ["Piscem", "Pullum cum oryza", "Caseum", "Fructus"],
        correctIndex: 1,
      },
      { prompt: "Quid bibere poscunt?", choices: ["Vinum", "Lac", "Aquam", "Nihil"], correctIndex: 2 },
      { prompt: "Qualis est cena?", choices: ["Mala", "Optima", "Frigida", "Parva"], correctIndex: 1 },
    ],
  },
  {
    id: "la-comp-work",
    languageId: "la",
    level: "A2",
    title: "Opus meum",
    text: "Medicus sum et in valetudinario magno laboro. Cotidie cum multis aegris loquor. Opus meum difficile est sed hominibus adiuvare mihi placet. Post opus, fessus sum et domi quiescere volo.",
    questions: [
      {
        prompt: "Ubi laborat?",
        choices: ["In schola", "In valetudinario", "In taberna", "In cauponia"],
        correctIndex: 1,
      },
      {
        prompt: "Cum quibus cotidie loquitur?",
        choices: ["Cum discipulis", "Cum mercatoribus", "Cum aegris", "Cum amicis"],
        correctIndex: 2,
      },
      { prompt: "Quomodo se sentit post opus?", choices: ["Laetus", "Fessus", "Taediosus", "Iratus"], correctIndex: 1 },
    ],
  },
];
