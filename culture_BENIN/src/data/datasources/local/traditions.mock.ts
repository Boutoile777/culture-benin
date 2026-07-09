import type { Tradition } from "@/domain/entities/Tradition";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const TRADITIONS_MOCK: Tradition[] = [
  {
    id: "peche-acadja-ganvie",
    cityId: "ganvie",
    name: "La pêche à l'acadja",
    description:
      "Une technique d'élevage de poissons en enclos de branchages, transmise de génération en génération sur le lac Nokoué.",
    narrative:
      "L'acadja consiste à planter des branchages en cercle dans le lac : les poissons viennent s'y abriter et s'y nourrir des algues qui s'y développent, avant d'être capturés au filet une fois l'enclos refermé. Développée par les Toffinou de Ganvié, cette méthode d'aquaculture traditionnelle permet une pêche abondante sans épuiser les ressources du lac, et structure encore aujourd'hui l'économie familiale de la cité lacustre.",
    gallery: [
      wikimediaImage("Ganvié.jpg", 1600),
      wikimediaImage("Stilt houses in Ganvié (33680913086).jpg", 1600),
    ],
    testimonies: [
      {
        id: "acadja-temoignage-1",
        type: "audio",
        title: "Un savoir-faire transmis en famille",
        speaker: "Pêcheuse toffinou, Ganvié",
        image: wikimediaImage("Ganvié.jpg", 1200),
        transcript:
          "Ma grand-mère plaçait déjà ses branchages au même endroit du lac. On n'apprend pas l'acadja dans un livre : on l'apprend en accompagnant les anciens, enclos après enclos.",
        duration: "2 min 00",
      },
    ],
  },
  {
    id: "tata-somba-natitingou",
    cityId: "natitingou",
    name: "Les Tata Somba",
    description:
      "Des maisons-forteresses en terre à tourelles, uniques au monde, bâties par les Betammaribè de l'Atacora.",
    narrative:
      "Conçues à la fois comme habitations et comme fortifications, les tata somba comportent des tourelles reliées par une terrasse, un rez-de-chaussée pour le bétail et un étage pour les greniers et les chambres. Cette architecture de terre, adaptée à la défense contre les razzias et aux besoins agricoles des Betammaribè, reste aujourd'hui candidate au patrimoine mondial de l'UNESCO.",
    gallery: [wikimediaImage("Benin Natitingou.JPG", 1600)],
    testimonies: [
      {
        id: "tata-somba-temoignage-1",
        type: "audio",
        title: "Une maison pensée pour se défendre et vivre",
        speaker: "Doyen betammaribè, région de Natitingou",
        image: wikimediaImage("Benin Natitingou.JPG", 1200),
        transcript:
          "Chaque tourelle a un rôle : l'une pour le grain, l'autre pour dormir, une autre encore pour surveiller au loin. Nos ancêtres ont pensé cette maison pour résister aux razzias sans jamais quitter leur terre.",
        duration: "2 min 25",
      },
    ],
  },
  {
    id: "tentures-appliquees-abomey",
    cityId: "abomey",
    name: "Les tentures appliquées d'Abomey",
    description:
      "Un artisanat royal du Danxomè, où chaque scène cousue raconte un épisode de l'histoire du royaume.",
    narrative:
      "Transmis de maître à apprenti au sein de familles d'artisans dédiées, l'art de la tenture appliquée illustrait les hauts faits des rois du Danxomè à l'aide de figures de tissu cousues sur fond de coton. Autrefois réservées à la cour royale, ces tentures — comme les bas-reliefs polychromes des palais — continuent d'être produites par des ateliers d'Abomey qui perpétuent ce savoir-faire.",
    gallery: [
      wikimediaImage("Abomey Royal Palace.jpg", 1600),
      wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1600),
    ],
    testimonies: [
      {
        id: "tentures-temoignage-1",
        type: "audio",
        title: "Coudre l'histoire du royaume",
        speaker: "Artisan tenturier, atelier d'Abomey",
        image: wikimediaImage("Abomey Royal Palace.jpg", 1200),
        transcript:
          "Chaque figure que je couds a un sens précis : un animal, une arme, un symbole de règne. Ce n'est pas de la décoration, c'est une écriture — celle de l'histoire du Danxomè.",
        duration: "2 min 10",
      },
    ],
  },
  {
    id: "architecture-aguda-porto-novo",
    cityId: "portonovo",
    name: "L'héritage architectural aguda",
    description:
      "Le style afro-brésilien rapporté par les familles aguda de retour d'exil, qui a redessiné Porto-Novo.",
    narrative:
      "Au XIXe siècle, d'anciens esclaves affranchis et leurs descendants revenus du Brésil — les Aguda — s'installent à Porto-Novo et y importent un style architectural inspiré des maisons coloniales et des églises baroques de Bahia. Façades ouvragées, vérandas et frontons ornés caractérisent ce patrimoine bâti, dont la Grande Mosquée reste l'exemple le plus emblématique.",
    gallery: [wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1600)],
    testimonies: [
      {
        id: "aguda-temoignage-1",
        type: "audio",
        title: "Le retour d'exil qui a redessiné la ville",
        speaker: "Historien de l'architecture, Porto-Novo",
        image: wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1200),
        transcript:
          "Les familles aguda sont revenues avec des plans dans la tête plutôt que sur papier. Elles ont recréé ici ce qu'elles avaient connu à Bahia — et c'est devenu, avec le temps, une architecture pleinement porto-novienne.",
        duration: "2 min 15",
      },
    ],
  },
];
