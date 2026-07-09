import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const HISTORICAL_FIGURES_MOCK: HistoricalFigure[] = [
  {
    id: "agaja",
    cityId: "abomey",
    name: "Agaja",
    role: "Roi du Danxomè (v. 1718–1740)",
    initials: "A",
    biography: [
      "Troisième roi du Danxomè, Agaja mène une politique d'expansion décisive : il conquiert le royaume d'Allada en 1724 puis celui de Xwéda (Ouidah) en 1727, donnant au Danxomè un accès direct à la côte atlantique et à ses comptoirs de traite.",
      "Son règne pose les bases administratives et militaires qui feront la puissance du royaume pendant près de deux siècles, et fait d'Abomey la capitale incontestée du Danxomè.",
    ],
    gallery: [wikimediaImage("Abomey Royal Palace.jpg", 1400)],
    testimonies: [
      {
        id: "agaja-temoignage-1",
        type: "audio",
        title: "Le roi qui a ouvert le Danxomè sur l'Atlantique",
        speaker: "Historien, Université d'Abomey-Calavi",
        image: wikimediaImage("Abomey Royal Palace.jpg", 1200),
        transcript:
          "Sans la conquête d'Agaja, le Danxomè serait resté un royaume de l'intérieur. En prenant Ouidah, il a donné à son royaume un accès direct à la mer — et donc au commerce international, pour le meilleur et pour le pire.",
        duration: "2 min 00",
      },
    ],
  },
  {
    id: "tassi-hangbe",
    cityId: "abomey",
    name: "Tassi Hangbé",
    role: "Reine du Danxomè (v. 1708–1711)",
    initials: "TH",
    biography: [
      "Seule femme reconnue à avoir régné sur le Danxomè, Tassi Hangbé serait montée sur le trône après la mort de son frère jumeau, le roi Akaba, avant l'accession d'Agaja.",
      "La tradition orale lui attribue la création ou le renforcement du corps des Agodjié, les célèbres guerrières du royaume. Longtemps effacée des listes officielles des douze rois, sa mémoire a été restaurée par les autorités culturelles béninoises et un temple lui est aujourd'hui dédié à Abomey.",
    ],
    gallery: [wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1400)],
    testimonies: [
      {
        id: "tassi-hangbe-temoignage-1",
        type: "audio",
        title: "Une mémoire longtemps effacée, aujourd'hui restaurée",
        speaker: "Gardienne du temple dédié à Tassi Hangbé, Abomey",
        image: wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1200),
        transcript:
          "Pendant longtemps, son nom n'apparaissait dans aucune liste officielle des rois. Aujourd'hui, on vient ici lui rendre hommage, et rappeler qu'une femme a bien régné sur le Danxomè.",
        duration: "1 min 50",
      },
    ],
  },
  {
    id: "gezo",
    cityId: "abomey",
    name: "Gezo (Ghézo)",
    role: "Roi du Danxomè (1818–1858)",
    initials: "G",
    biography: [
      "Porté au pouvoir par un coup d'État soutenu par le négociant Francisco Félix de Souza, Gezo met fin au tribut versé par le Danxomè à l'empire yoruba d'Oyo.",
      "Il réorganise en profondeur l'administration et l'armée du royaume, dont le corps des Agodjié. Son long règne marque l'apogée politique et militaire du Danxomè au XIXe siècle.",
    ],
    gallery: [wikimediaImage("Abomey Royal Palace.jpg", 1400)],
    testimonies: [
      {
        id: "gezo-temoignage-1",
        type: "audio",
        title: "L'apogée du royaume",
        speaker: "Guide du patrimoine royal, Abomey",
        image: wikimediaImage("Abomey Royal Palace.jpg", 1200),
        transcript:
          "Sous Gezo, le Danxomè ne payait plus tribut à personne. C'est l'un des règnes les plus commentés par les historiens, parce qu'il a transformé le royaume en puissance régionale capable de tenir tête à ses voisins.",
        duration: "2 min 15",
      },
    ],
  },
  {
    id: "behanzin",
    cityId: "abomey",
    name: "Béhanzin",
    role: "Roi du Danxomè (1889–1894)",
    initials: "B",
    biography: [
      "Dernier roi indépendant du Danxomè, Béhanzin résiste aux troupes coloniales françaises lors des guerres franco-dahoméennes de 1892 à 1894.",
      "Vaincu, il est exilé en Martinique puis en Algérie, où il meurt en 1906. Symbole de la résistance à la colonisation, une partie des trésors royaux pillés en 1892 a été restituée par la France au Bénin en novembre 2021.",
    ],
    portrait: wikimediaImage("Behanzin-1895.jpg", 1400),
    testimonies: [
      {
        id: "behanzin-temoignage-1",
        type: "audio",
        title: "Le symbole de la résistance du Danxomè",
        speaker: "Descendant de la famille royale du Danxomè",
        image: wikimediaImage("Behanzin-1895.jpg", 1200),
        transcript:
          "Béhanzin n'a jamais accepté la défaite comme une fin. Le retour des trésors royaux en 2021 a été vécu ici comme la preuve que cette résistance n'avait pas été oubliée, plus d'un siècle après.",
        duration: "2 min 30",
      },
    ],
  },
  {
    id: "francisco-felix-de-sousa",
    cityId: "ouidah",
    name: "Francisco Félix de Souza",
    role: "Négociant et vice-roi de Ouidah (« Chacha », 1773–1849)",
    initials: "FS",
    biography: [
      "Négociant afro-brésilien installé à Ouidah au début du XIXe siècle, Francisco Félix de Souza aide Gezo à prendre le pouvoir en 1818.",
      "En récompense, il reçoit le titre de Chacha, vice-roi de Ouidah chargé des relations commerciales avec les Européens — une charge qui restera héréditaire dans sa famille. Sa demeure, la Maison du Chacha, témoigne encore aujourd'hui de l'héritage afro-brésilien de la ville.",
    ],
    portrait: wikimediaImage("Francisco Félix de Souza.jpg", 1400),
    testimonies: [
      {
        id: "de-souza-temoignage-1",
        type: "audio",
        title: "L'héritage du premier Chacha",
        speaker: "Descendant de la famille de Souza, Ouidah",
        image: wikimediaImage("Francisco Félix de Souza.jpg", 1200),
        transcript:
          "Le titre de Chacha s'est transmis dans notre famille depuis Francisco Félix de Souza. C'est une histoire complexe, mêlée à la traite, mais qui a aussi façonné l'identité afro-brésilienne de Ouidah telle qu'on la connaît aujourd'hui.",
        duration: "2 min 05",
      },
    ],
  },
  {
    id: "toffa-i",
    cityId: "portonovo",
    name: "Toffa Ier",
    role: "Roi de Porto-Novo (règne à partir de 1874)",
    initials: "T",
    biography: [
      "Roi de Porto-Novo (Hogbonou), Toffa Ier signe en 1882 un traité de protectorat avec la France, cherchant à préserver son royaume face aux pressions du Danxomè et du Royaume-Uni.",
      "Ce traité fait de Porto-Novo la première ville du Bénin actuel sous protectorat français et façonne durablement son destin de capitale administrative.",
    ],
    gallery: [wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1400)],
    testimonies: [
      {
        id: "toffa-temoignage-1",
        type: "audio",
        title: "Un traité pour préserver le royaume",
        speaker: "Conservateur, Musée Honmè",
        image: wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1200),
        transcript:
          "Toffa Ier a fait un choix difficile, mais réfléchi : s'allier à la France pour ne pas être absorbé par ses voisins. C'est ce choix qui a fait de Porto-Novo la capitale administrative qu'elle est restée.",
        duration: "1 min 55",
      },
    ],
  },
];
