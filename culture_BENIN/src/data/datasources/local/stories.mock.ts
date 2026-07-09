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
    gallery: [wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1600)],
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
    gallery: [wikimediaImage("Door of no return.jpg", 1600), wikimediaImage("La porte du non retour à Ouidah.jpg", 1600)],
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
    gallery: [wikimediaImage("Stilt houses in Ganvié (33680913086).jpg", 1600)],
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
  {
    id: "tortue-ruse-conte",
    category: "Conte",
    title: "La Tortue, maîtresse de la ruse",
    excerpt:
      "Un conte transmis de génération en génération autour du feu, où la ruse triomphe de la force.",
    content:
      "Un jour, le Léopard organisa un grand concours pour désigner l'animal le plus fort de la forêt, persuadé de le remporter sans effort. La Tortue, trop lente pour rivaliser de vitesse, proposa plutôt une épreuve d'endurance à la corde contre le Léopard d'un côté et l'Hippopotame de l'autre — sans jamais leur dire qu'ils tiraient l'un contre l'autre. Chacun, croyant affronter la petite Tortue, tira de toutes ses forces pendant des heures sans jamais gagner de terrain. Épuisés, les deux géants durent reconnaître la victoire de la Tortue. Ce conte, raconté aux veillées dans tout le Bénin, rappelle qu'il n'est pas de vantard que la ruse ne puisse remettre à sa place.",
    image: wikimediaImage("Tortoise (2).jpg", 1600),
  },
  {
    id: "araignee-savoir-conte",
    category: "Conte",
    title: "Pourquoi le savoir appartient à tous",
    excerpt:
      "Un conte espiègle sur l'Araignée qui voulut enfermer toute la sagesse du monde dans une calebasse.",
    content:
      "L'Araignée décida un jour de rassembler toute la sagesse du monde dans une calebasse, pour la garder pour elle seule et devenir la plus savante de tous. Elle l'attacha devant elle et entreprit de grimper au sommet du plus grand arbre pour la mettre à l'abri. Mais la calebasse, coincée entre ses pattes, l'empêchait sans cesse d'avancer. Son fils, resté au pied de l'arbre, lui cria de l'attacher plutôt dans son dos : elle grimperait alors sans peine. Furieuse d'avoir été surpassée par un enfant alors qu'elle croyait détenir toute la sagesse, l'Araignée brisa la calebasse de dépit — et c'est ainsi, raconte-t-on, que le savoir se répandit dans le monde entier, à la portée de chacun.",
    image: wikimediaImage("Spider web with dew drops.jpg", 1600),
  },
];
