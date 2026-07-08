import type { Story } from "@/domain/entities/Story";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const STORIES_MOCK: Story[] = [
  {
    id: "agodjie-guerrieres-danxome",
    cityId: "abomey",
    category: "Résistance",
    title: "Les Agodjié, guerrières du Danxomè",
    excerpt:
      "L'histoire du seul corps militaire féminin régulier de l'histoire moderne.",
    content:
      "Recrutées dès l'adolescence et soumises à un entraînement d'une dureté légendaire, les Agodjié formaient jusqu'à un tiers de l'armée du royaume du Danxomè. Chasseresses d'éléphants devenues garde royale puis troupes de choc, elles impressionnèrent jusqu'aux officiers français qui les affrontèrent en 1892. Un temple leur rend aujourd'hui hommage à Abomey, rappelant que l'histoire du royaume ne peut se raconter sans elles.",
    image: wikimediaImage("Abomey Royal Palace.jpg", 1800),
  },
  {
    id: "route-des-esclaves",
    cityId: "ouidah",
    category: "Mémoire",
    title: "La Route des Esclaves",
    excerpt:
      "Quatre kilomètres de mémoire entre la place aux enchères et l'océan.",
    content:
      "De la place Chacha — où se tenaient les enchères — jusqu'à la plage, le parcours suit les derniers pas des captifs : l'arbre de l'Oubli, autour duquel on les faisait tourner pour effacer leur mémoire, la case de Zomaï où ils attendaient dans l'obscurité, et l'arbre du Retour, promesse que leur âme reviendrait sur la terre natale. Ce chemin mène à la Porte du Non-Retour, érigée face à l'Atlantique en mémoire des déportés.",
    image: wikimediaImage(
      "Ouidah-Esplanade de la Porte du Non-Retour-Côté océan (1).jpg",
      1600,
    ),
  },
  {
    id: "ganvie-paix-sur-eau",
    cityId: "ganvie",
    category: "Ingéniosité",
    title: "Ganvié, la paix sur l'eau",
    excerpt:
      "Comment un peuple a bâti une cité entière sur un lac pour rester libre.",
    content:
      "Au XVIIIe siècle, les populations Toffinou fuient les chasseurs d'esclaves du royaume du Danxomè, qui s'interdisaient religieusement de combattre sur l'eau. Elles s'installent au milieu du lac Nokoué et fondent Ganvié — « la communauté de ceux qui ont trouvé la paix ». Trois siècles plus tard, plus de 3 000 bâtiments sur pilotis, un marché flottant et des enclos de pêche acadja perpétuent cette vie entièrement lacustre.",
    image: wikimediaImage("Ganvié.jpg", 1600),
  },
  {
    id: "vodoun-religion-du-vivant",
    cityId: "ouidah",
    category: "Spiritualité",
    title: "Le Vodoun, religion du vivant",
    excerpt:
      "Chaque 10 janvier, Ouidah devient l'épicentre mondial du culte vodoun.",
    content:
      "Reconnue fête nationale en 1993, la Fête du Vodoun rassemble chaque année dignitaires, couvents et dizaines de milliers de fidèles sur la plage de Ouidah. Libations, danses de possession, sorties de masques Egungun et Zangbeto rythment une journée devenue aussi un grand rendez-vous des diasporas et — depuis 2024 — le festival international « Vodun Days ».",
    image: wikimediaImage("Vodoun party in Benin.jpg", 1600),
  },
];
