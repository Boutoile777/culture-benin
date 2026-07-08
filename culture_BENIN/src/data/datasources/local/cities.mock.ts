import type { City } from "@/domain/entities/City";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const CITIES_MOCK: City[] = [
  {
    id: "ouidah",
    name: "Ouidah",
    region: "Département de l'Atlantique",
    nickname: "« Cité mémoire du Vodoun »",
    tagline:
      "Face à l'océan, la mémoire atlantique s'écrit encore : Route des Esclaves, temples vodoun et pèlerinages venus du monde entier.",
    heroImage: wikimediaImage("Door of no return.jpg", 1800),
    cardImage: wikimediaImage("La porte du non retour à Ouidah.jpg",1800),
    introduction:
      "Ancien comptoir du royaume de Xwéda puis port majeur de la traite atlantique, Ouidah est aujourd'hui la capitale spirituelle du Vodoun et un haut lieu de mémoire mondiale.",
    history:
      "Fondée autour du royaume de Xwéda, Ouidah devient à partir du XVIIe siècle l'un des principaux ports de la traite négrière sur la côte des Esclaves. Conquise par le royaume du Danxomè en 1727, la ville voit passer des centaines de milliers de captifs sur la Route des Esclaves, quatre kilomètres reliant la place aux enchères à la plage d'embarquement. Ouidah est aussi le berceau du culte vodoun : temples, couvents et forêts sacrées y structurent la vie spirituelle. Depuis 1993, la ville accueille chaque 10 janvier la Fête nationale du Vodoun, et la Porte du Non-Retour, érigée face à l'océan, est devenue un lieu de pèlerinage pour les diasporas.",
    order: 0,
  },
  {
    id: "abomey",
    name: "Abomey",
    region: "Département du Zou",
    nickname: "« Berceau du royaume du Danxomè »",
    tagline:
      "Douze rois, un seul défi : parcourez les palais UNESCO et l'épopée guerrière du Danxomè.",
    heroImage: wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1800),
    cardImage: wikimediaImage("Abomey Royal Palace.jpg", 1800),
    introduction:
      "Capitale historique du puissant royaume du Danxomè (1625–1894), Abomey conserve les palais royaux inscrits au patrimoine mondial de l'UNESCO et une tradition artisanale d'exception.",
    history:
      "Le royaume du Danxomè naît vers 1625 sous l'impulsion du roi Houégbadja. Douze rois se succèdent, chacun bâtissant son propre palais dans l'enceinte royale — un ensemble de 47 hectares aujourd'hui classé UNESCO. Le royaume s'illustre par son administration centralisée, son armée redoutée — dont les célèbres Agodjié, les amazones du Danxomè — et un art de cour raffiné : bas-reliefs polychromes, tentures appliquées, trônes et récades. La résistance du roi Béhanzin face à la conquête coloniale française (1892–1894) marque la fin de l'indépendance du royaume, mais son héritage demeure au cœur de l'identité béninoise, ravivé par le retour des trésors royaux en 2021.",
    order: 1,
  },
  {
    id: "portonovo",
    name: "Porto-Novo",
    region: "Département de l'Ouémé",
    nickname: "« Hogbonou, la ville aux trois noms »",
    tagline:
      "Trois noms, un carrefour : la capitale où se croisent héritages yoruba, afro-brésilien et colonial.",
    heroImage: wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1800),
    cardImage: wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1800),
    introduction:
      "Capitale officielle du Bénin, Porto-Novo — Hogbonou en goun, Adjacè en yoruba — mêle héritages goun et yoruba, architecture afro-brésilienne et mémoire coloniale.",
    history:
      "Fondée au XVIe siècle par des princes venus d'Allada, la ville devient le siège du royaume de Hogbonou. Les navigateurs portugais la baptisent Porto-Novo au XVIIIe siècle. Elle accueille dès le XIXe siècle des familles afro-brésiliennes de retour d'exil, les Aguda, qui y implantent une architecture unique — dont la Grande Mosquée au style d'église baroque brésilienne. Protectorat français en 1863, capitale du Dahomey colonial, elle demeure la capitale officielle du Bénin indépendant. Musées, temples, places royales et patrimoine bâti en font un conservatoire vivant des métissages du golfe de Guinée.",
    order: 2,
  },
  {
    id: "ganvie",
    name: "Ganvié",
    region: "Lac Nokoué — Sô-Ava",
    nickname: "« La Venise de l'Afrique »",
    tagline:
      "Une cité entière posée sur l'eau, née d'un pari audacieux pour échapper à l'esclavage.",
    heroImage: wikimediaImage("Stilt houses in Ganvié (33680913086).jpg", 1800),
    cardImage: wikimediaImage("Stilt houses in Ganvié (33680913086).jpg", 1800),
    introduction:
      "Plus grande cité lacustre d'Afrique, Ganvié abrite plus de 30 000 habitants sur les eaux du lac Nokoué — un refuge fondé au XVIIIe siècle pour échapper aux razzias esclavagistes.",
    history:
      "Au XVIIIe siècle, les populations Toffinou fuient les chasseurs d'esclaves du royaume du Danxomè. Les guerriers danxoméens ayant l'interdit religieux de combattre sur l'eau, les Toffinou s'installent au milieu du lac Nokoué : Ganvié — « la communauté de ceux qui ont trouvé la paix ». Maisons sur pilotis de bois et de bambou, marché flottant, pêche à l'acadja — un système ingénieux d'enclos de branchages — organisent depuis trois siècles une vie entièrement lacustre. Inscrite sur la liste indicative de l'UNESCO, Ganvié incarne une résistance devenue culture, où l'école, le temple et le marché se rejoignent en pirogue.",
    order: 3,
  },
];
