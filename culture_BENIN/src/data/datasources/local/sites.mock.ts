import type { Site } from "@/domain/entities/Site";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const SITES_MOCK: Site[] = [
  {
    id: "porte",
    cityId: "ouidah",
    category: "Sites historiques",
    name: "Porte du Non-Retour",
    description: "Mémorial de la traite atlantique, sur la plage de Ouidah.",
    image: wikimediaImage("Door of no return.jpg", 1800),
    narrative:
      "Érigée en 1995 dans le cadre du projet « La Route de l'Esclave » de l'UNESCO, la Porte du Non-Retour marque l'aboutissement des quatre kilomètres de la Route des Esclaves, depuis la place Chacha jusqu'à l'océan. Ses bas-reliefs représentent les différentes étapes de la traite, de la capture à l'embarquement. Face à l'Atlantique, le monument est devenu un lieu de pèlerinage pour les diasporas afro-descendantes venues renouer avec cette mémoire.",
    gallery: [
      wikimediaImage("La porte du non retour à Ouidah.jpg", 1600),
      wikimediaImage(
        "Ouidah-Esplanade de la Porte du Non-Retour-Côté océan (1).jpg",
        1600,
      ),
    ],
    testimonies: [
      {
        id: "porte-temoignage-1",
        type: "audio",
        title: "Un lieu de recueillement et de mémoire",
        speaker: "Guide mémoriel, Route des Esclaves",
        image: wikimediaImage("La porte du non retour à Ouidah.jpg", 1200),
        transcript:
          "Chaque année, des visiteurs viennent ici pour se recueillir. Ce monument ne raconte pas seulement un chapitre douloureux : il rappelle aussi la force de celles et ceux qui ont survécu, et le lien qui unit encore Ouidah aux diasporas d'Amérique et des Caraïbes.",
        duration: "2 min 10",
      },
    ],
  },
  {
    id: "pythons",
    cityId: "ouidah",
    category: "Sites historiques",
    name: "Temple des Pythons",
    description: "Sanctuaire vodoun du serpent sacré Dangbé.",
    narrative:
      "Situé en face de la basilique catholique de Ouidah — un voisinage souvent cité comme symbole de coexistence religieuse — ce temple abrite des pythons royaux considérés comme l'incarnation de Dangbé, divinité protectrice de la ville. Les serpents, réputés inoffensifs, peuvent être manipulés lors des visites sous la conduite des gardiens du temple.",
    testimonies: [
      {
        id: "pythons-temoignage-1",
        type: "audio",
        title: "Dangbé, protecteur plus que menace",
        speaker: "Gardien du temple",
        image: wikimediaImage("Vodoun party in Benin.jpg", 1200),
        transcript:
          "Le python n'est pas craint ici, il est protégé. Dangbé veille sur la ville depuis des générations, et chaque famille de Ouidah connaît une histoire où le serpent a montré sa bienveillance plutôt que sa morsure.",
        duration: "1 min 45",
      },
    ],
  },
  {
    id: "fort",
    cityId: "ouidah",
    category: "Musées",
    name: "Musée d'histoire de Ouidah",
    description: "Ancien fort portugais, musée de la mémoire de la traite.",
    narrative:
      "Installé dans le fort portugais São João Baptista da Ajudá, construit au XVIIIe siècle et resté enclave portugaise jusqu'en 1961, le musée retrace l'histoire du royaume de Xwéda, la traite atlantique et les liens tissés entre Ouidah et les diasporas du Brésil et des Caraïbes.",
  },
  {
    id: "kpasse",
    cityId: "ouidah",
    category: "Patrimoine naturel",
    name: "Forêt sacrée de Kpassè",
    description: "Bois sacré du roi fondateur, sculptures contemporaines.",
    narrative:
      "Selon la tradition orale, le roi fondateur Kpassè se serait métamorphosé en iroko pour échapper à ses ennemis ; l'arbre sacré qui porte son nom se dresse toujours au cœur de ce bois. Le site abrite aujourd'hui des sculptures contemporaines représentant les divinités du panthéon vodoun, au milieu d'une végétation protégée.",
    testimonies: [
      {
        id: "kpasse-temoignage-1",
        type: "audio",
        title: "L'arbre qui n'est jamais vraiment parti",
        speaker: "Conteur local",
        image: wikimediaImage("Vodoun party in Benin.jpg", 1200),
        transcript:
          "On dit que Kpassè n'est jamais vraiment parti : il a choisi de devenir arbre plutôt que de quitter les siens. Aujourd'hui encore, on vient déposer une offrande au pied de l'iroko avant d'entrer dans la ville.",
        duration: "1 min 30",
      },
    ],
  },
  {
    id: "fetvodoun",
    cityId: "ouidah",
    category: "Festivals",
    name: "Plage de Ouidah — Fête du Vodoun",
    description: "Épicentre de la Fête nationale du Vodoun, chaque 10 janvier.",
    image: wikimediaImage("Vodoun party in Benin.jpg", 1600),
    narrative:
      "Reconnue fête nationale en 1993, la Fête du Vodoun transforme chaque 10 janvier la plage de Ouidah en épicentre mondial du culte : libations, danses de possession et sorties de masques Egungun et Zangbeto y rassemblent dignitaires, couvents et dizaines de milliers de fidèles et visiteurs.",
  },
  {
    id: "palais",
    cityId: "abomey",
    category: "Sites historiques",
    name: "Palais royaux d'Abomey",
    description: "Enceinte royale UNESCO des douze rois du Danxomè.",
    image: wikimediaImage("Abomey Royal Palace.jpg", 1800),
    narrative:
      "Classé au patrimoine mondial de l'UNESCO depuis 1985, cet ensemble de 47 hectares regroupe les palais bâtis par les rois successifs du Danxomè entre 1625 et 1900. Bas-reliefs polychromes, tentures appliquées, trônes et récades y racontent l'histoire du royaume et de son art de cour, dont une partie des trésors — pillés en 1892 — a été restituée par la France en 2021.",
    gallery: [wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1600)],
    testimonies: [
      {
        id: "palais-temoignage-1",
        type: "audio",
        title: "Chaque bas-relief raconte un règne",
        speaker: "Conservateur, Musée historique d'Abomey",
        image: wikimediaImage("Abomey Royal Palace.jpg", 1200),
        transcript:
          "Chaque bas-relief que vous voyez ici a été façonné pour être lu comme un livre : une victoire, un animal totem, un symbole de règne. Rien n'est décoratif, tout raconte quelque chose du roi qui l'a commandé.",
        duration: "2 min 40",
      },
    ],
  },
  {
    id: "goho",
    cityId: "abomey",
    category: "Lieux touristiques",
    name: "Place Goho",
    description: "Statue monumentale du roi Béhanzin.",
    narrative:
      "À l'entrée de la ville, cette place accueille une statue monumentale du roi Béhanzin représenté sous les traits du requin, l'un des emblèmes royaux du Danxomè associé à sa force de résistance face à la colonisation. Le lieu sert aujourd'hui de point de rassemblement pour les célébrations et cortèges officiels d'Abomey.",
  },
  {
    id: "mosquee",
    cityId: "portonovo",
    category: "Sites historiques",
    name: "Grande Mosquée de Porto-Novo",
    description: "Architecture afro-brésilienne inspirée de Bahia.",
    image: wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1800),
    narrative:
      "Construite au début du XXe siècle par la communauté aguda — ces familles afro-brésiliennes revenues d'exil au XIXe siècle — la Grande Mosquée reprend le style des églises baroques de Bahia plutôt que l'architecture sahélienne habituelle des mosquées ouest-africaines. Elle demeure l'un des symboles les plus visibles du métissage culturel et religieux de Porto-Novo.",
    testimonies: [
      {
        id: "mosquee-temoignage-1",
        type: "audio",
        title: "Une histoire de retour autant que de foi",
        speaker: "Habitant du quartier Adjégounlé",
        image: wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1200),
        transcript:
          "Nos grands-parents aguda sont revenus du Brésil avec leurs souvenirs d'architecture, et ils les ont fait revivre ici. Cette mosquée, pour nous, c'est autant une histoire de retour qu'une histoire de foi.",
        duration: "2 min 05",
      },
    ],
  },
  {
    id: "honme",
    cityId: "portonovo",
    category: "Musées",
    name: "Musée Honmè",
    description: "Palais du roi Toffa, mémoire du royaume de Hogbonou.",
    narrative:
      "Ancien palais du roi Toffa Ier, signataire du traité de protectorat français de 1882, le palais Honmè est aujourd'hui un musée présentant régalia royaux, tissus et objets rituels du royaume de Hogbonou, ainsi que des reconstitutions de scènes de la cour royale.",
  },
  {
    id: "jardin",
    cityId: "portonovo",
    category: "Patrimoine naturel",
    name: "Jardin des Plantes et de la Nature",
    description: "Jardin botanique au cœur de la capitale.",
    narrative:
      "Ce jardin botanique urbain rassemble une collection d'essences locales et de plantes médicinales traditionnelles, et sert de support à des programmes d'éducation environnementale pour les scolaires de Porto-Novo.",
  },
  {
    id: "ganvie",
    cityId: "ganvie",
    category: "Lieux touristiques",
    name: "Ganvié, cité lacustre",
    description: "La plus grande cité sur pilotis d'Afrique, sur le lac Nokoué.",
    image: wikimediaImage("Stilt houses in Ganvié (33680913086).jpg", 1800),
    narrative:
      "Fondée au XVIIIe siècle par les Toffinou fuyant les razzias esclavagistes du Danxomè, Ganvié compte aujourd'hui plus de 30 000 habitants répartis sur des maisons en pilotis, un marché flottant et des enclos de pêche acadja — un système d'élevage de poissons en branchages transmis de génération en génération.",
    gallery: [wikimediaImage("Ganvié.jpg", 1600)],
    testimonies: [
      {
        id: "ganvie-temoignage-1",
        type: "audio",
        title: "Un savoir qui se transmet en pirogue",
        speaker: "Pêcheur toffinou",
        image: wikimediaImage("Ganvié.jpg", 1200),
        transcript:
          "On apprend à poser l'acadja avant même de savoir bien nager. C'est tout un savoir qui se transmet en pirogue, de génération en génération, sans qu'on ait jamais eu besoin de l'écrire.",
        duration: "2 min 20",
      },
    ],
  },
];
