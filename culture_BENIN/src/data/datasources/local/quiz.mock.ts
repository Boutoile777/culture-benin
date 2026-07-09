import type { QuizQuestion } from "@/domain/entities/QuizQuestion";

export const QUIZ_QUESTIONS_MOCK: QuizQuestion[] = [
  {
    id: "quiz-danxome-capitale",
    question: "Quelle ville fut la capitale du royaume du Danxomè ?",
    options: [
      { id: "a", label: "Ouidah", isCorrect: false },
      { id: "b", label: "Abomey", isCorrect: true },
      { id: "c", label: "Porto-Novo", isCorrect: false },
      { id: "d", label: "Ganvié", isCorrect: false },
    ],
    feedback:
      "Abomey fut la capitale du royaume du Danxomè de 1625 à 1894, où douze rois se sont succédé.",
  },
  {
    id: "quiz-agodjie",
    question: "Comment appelle-t-on les guerrières du royaume du Danxomè ?",
    options: [
      { id: "a", label: "Les Agodjié", isCorrect: true },
      { id: "b", label: "Les Toffinou", isCorrect: false },
      { id: "c", label: "Les Aguda", isCorrect: false },
      { id: "d", label: "Les Egungun", isCorrect: false },
    ],
    feedback:
      "Les Agodjié formaient le seul corps militaire féminin régulier de l'histoire moderne, jusqu'à un tiers de l'armée du Danxomè.",
  },
  {
    id: "quiz-ganvie-fondation",
    question: "Pourquoi les Toffinou ont-ils fondé Ganvié au milieu du lac Nokoué ?",
    options: [
      { id: "a", label: "Pour développer la pêche", isCorrect: false },
      {
        id: "b",
        label: "Pour échapper aux chasseurs d'esclaves du Danxomè",
        isCorrect: true,
      },
      { id: "c", label: "Sur ordre des colons portugais", isCorrect: false },
      { id: "d", label: "Pour fuir une épidémie", isCorrect: false },
    ],
    feedback:
      "Les guerriers danxoméens s'interdisaient religieusement de combattre sur l'eau : les Toffinou y ont trouvé un refuge, d'où le nom de Ganvié, « la paix sur l'eau ».",
  },
  {
    id: "quiz-vodoun-date",
    question: "Depuis quelle année la Fête du Vodoun est-elle une fête nationale au Bénin ?",
    options: [
      { id: "a", label: "1975", isCorrect: false },
      { id: "b", label: "1993", isCorrect: true },
      { id: "c", label: "2001", isCorrect: false },
      { id: "d", label: "2010", isCorrect: false },
    ],
    feedback:
      "Reconnue fête nationale en 1993, elle rassemble chaque 10 janvier des dizaines de milliers de fidèles sur la plage de Ouidah.",
  },
  {
    id: "quiz-porto-novo-noms",
    question: "Comment se nomme Porto-Novo en langue goun ?",
    options: [
      { id: "a", label: "Adjacè", isCorrect: false },
      { id: "b", label: "Hogbonou", isCorrect: true },
      { id: "c", label: "Xwéda", isCorrect: false },
      { id: "d", label: "Danxomè", isCorrect: false },
    ],
    feedback:
      "Porto-Novo est aussi appelée Hogbonou en goun et Adjacè en yoruba — la « ville aux trois noms ».",
  },
  {
    id: "quiz-route-esclaves",
    question: "Quelle distance sépare la place Chacha de la Porte du Non-Retour à Ouidah ?",
    options: [
      { id: "a", label: "Environ 1 km", isCorrect: false },
      { id: "b", label: "Environ 4 km", isCorrect: true },
      { id: "c", label: "Environ 10 km", isCorrect: false },
      { id: "d", label: "Environ 20 km", isCorrect: false },
    ],
    feedback:
      "La Route des Esclaves relie sur quatre kilomètres la place aux enchères à la plage d'embarquement, jalonnée de lieux de mémoire.",
  },
];
