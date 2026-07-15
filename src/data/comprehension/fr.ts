import type { ComprehensionPassage } from "../../types";

export const frComprehension: ComprehensionPassage[] = [
  {
    id: "fr-comp-family",
    languageId: "fr",
    level: "A1",
    title: "Ma famille",
    text: "Bonjour, je m'appelle Ana. J'ai une grande famille. Mon père s'appelle Carlos et ma mère s'appelle Rosa. J'ai un frère et une sœur. Notre maison est petite mais jolie. Nous aimons manger du pain et du fromage le matin.",
    questions: [
      { prompt: "Comment s'appelle le père d'Ana ?", choices: ["Carlos", "Rosa", "Ana", "Pierre"], correctIndex: 0 },
      {
        prompt: "Comment est la maison d'Ana ?",
        choices: ["Grande et laide", "Petite mais jolie", "Nouvelle et chère", "Vieille"],
        correctIndex: 1,
      },
      {
        prompt: "Que mangent-ils le matin ?",
        choices: ["Du riz et du poisson", "Un œuf et du lait", "Du pain et du fromage", "Des fruits"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "fr-comp-park",
    languageId: "fr",
    level: "A1",
    title: "Une journée au parc",
    text: "Aujourd'hui il fait du soleil. Je vais au parc avec mon chien. Mon chien est noir et très rapide. Au parc, je vois un chat gris et beaucoup d'oiseaux. Après, j'ai faim et je mange une pomme.",
    questions: [
      {
        prompt: "Quel temps fait-il aujourd'hui ?",
        choices: ["Il fait froid", "Il pleut", "Il fait du soleil", "Il y a un orage"],
        correctIndex: 2,
      },
      { prompt: "De quelle couleur est le chien ?", choices: ["Blanc", "Noir", "Marron", "Gris"], correctIndex: 1 },
      { prompt: "Que mange-t-il après ?", choices: ["Du pain", "Du fromage", "Une pomme", "Du riz"], correctIndex: 2 },
    ],
  },
  {
    id: "fr-comp-restaurant",
    languageId: "fr",
    level: "A2",
    title: "Au restaurant",
    text: "Je vais dans un restaurant avec mon ami. Le serveur nous apporte le menu. Je veux du poulet avec du riz, et mon ami veut du poisson. Nous avons soif, alors nous commandons de l'eau. Le repas est délicieux. À la fin, nous demandons l'addition et nous payons par carte.",
    questions: [
      {
        prompt: "Que veut manger la personne qui parle ?",
        choices: ["Du poisson", "Du poulet avec du riz", "Du fromage", "Des fruits"],
        correctIndex: 1,
      },
      { prompt: "Que commandent-ils à boire ?", choices: ["Du café", "Du lait", "De l'eau", "Rien"], correctIndex: 2 },
      {
        prompt: "Comment paient-ils ?",
        choices: ["En espèces", "Par carte", "Ils ne paient pas", "Par chèque"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "fr-comp-work",
    languageId: "fr",
    level: "A2",
    title: "Mon travail",
    text: "Je suis médecin et je travaille dans un grand hôpital. Tous les jours, je parle avec beaucoup de patients. Mon travail est difficile mais j'aime aider les gens. Après le travail, je suis fatigué et je veux me reposer à la maison.",
    questions: [
      {
        prompt: "Où travaille-t-il/elle ?",
        choices: ["Dans une école", "Dans un hôpital", "Dans un magasin", "Dans un restaurant"],
        correctIndex: 1,
      },
      {
        prompt: "Avec qui parle-t-il/elle tous les jours ?",
        choices: ["Avec des étudiants", "Avec des clients", "Avec des patients", "Avec des amis"],
        correctIndex: 2,
      },
      {
        prompt: "Comment se sent-il/elle après le travail ?",
        choices: ["Heureux", "Fatigué", "Ennuyé", "En colère"],
        correctIndex: 1,
      },
    ],
  },
];
