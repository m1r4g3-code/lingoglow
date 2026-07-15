import type { ComprehensionPassage } from "../../types";

export const esComprehension: ComprehensionPassage[] = [
  {
    id: "es-comp-family",
    languageId: "es",
    level: "A1",
    title: "Mi familia",
    text: "Hola, me llamo Ana. Tengo una familia grande. Mi padre se llama Carlos y mi madre se llama Rosa. Tengo un hermano y una hermana. Nuestra casa es pequeña pero bonita. Nos gusta comer pan y queso por la mañana.",
    questions: [
      { prompt: "¿Cómo se llama el padre de Ana?", choices: ["Carlos", "Rosa", "Ana", "Pedro"], correctIndex: 0 },
      {
        prompt: "¿Cómo es la casa de Ana?",
        choices: ["Grande y fea", "Pequeña pero bonita", "Nueva y cara", "Vieja"],
        correctIndex: 1,
      },
      {
        prompt: "¿Qué comen por la mañana?",
        choices: ["Arroz y pescado", "Huevo y leche", "Pan y queso", "Fruta"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "es-comp-park",
    languageId: "es",
    level: "A1",
    title: "Un día en el parque",
    text: "Hoy hace sol. Voy al parque con mi perro. Mi perro es negro y muy rápido. En el parque, veo un gato gris y muchos pájaros. Después, tengo hambre y como una manzana.",
    questions: [
      {
        prompt: "¿Qué tiempo hace hoy?",
        choices: ["Hace frío", "Llueve", "Hace sol", "Hay tormenta"],
        correctIndex: 2,
      },
      { prompt: "¿De qué color es el perro?", choices: ["Blanco", "Negro", "Marrón", "Gris"], correctIndex: 1 },
      { prompt: "¿Qué come después?", choices: ["Pan", "Queso", "Una manzana", "Arroz"], correctIndex: 2 },
    ],
  },
  {
    id: "es-comp-restaurant",
    languageId: "es",
    level: "A2",
    title: "En el restaurante",
    text: "Voy a un restaurante con mi amigo. El camarero nos trae el menú. Yo quiero pollo con arroz, y mi amigo quiere pescado. Tenemos sed, entonces pedimos agua. La comida es deliciosa. Al final, pedimos la cuenta y pagamos con tarjeta.",
    questions: [
      {
        prompt: "¿Qué quiere comer la persona que habla?",
        choices: ["Pescado", "Pollo con arroz", "Queso", "Fruta"],
        correctIndex: 1,
      },
      { prompt: "¿Qué piden para beber?", choices: ["Café", "Leche", "Agua", "Nada"], correctIndex: 2 },
      { prompt: "¿Cómo pagan?", choices: ["En efectivo", "Con tarjeta", "No pagan", "Con cheque"], correctIndex: 1 },
    ],
  },
  {
    id: "es-comp-work",
    languageId: "es",
    level: "A2",
    title: "Mi trabajo",
    text: "Soy médico y trabajo en un hospital grande. Todos los días hablo con muchos pacientes. Mi trabajo es difícil pero me gusta ayudar a la gente. Después del trabajo, estoy cansado y quiero descansar en casa.",
    questions: [
      {
        prompt: "¿Dónde trabaja?",
        choices: ["En una escuela", "En un hospital", "En una tienda", "En un restaurante"],
        correctIndex: 1,
      },
      {
        prompt: "¿Con quién habla todos los días?",
        choices: ["Con estudiantes", "Con clientes", "Con pacientes", "Con amigos"],
        correctIndex: 2,
      },
      {
        prompt: "¿Cómo se siente después del trabajo?",
        choices: ["Feliz", "Cansado", "Aburrido", "Enojado"],
        correctIndex: 1,
      },
    ],
  },
];
