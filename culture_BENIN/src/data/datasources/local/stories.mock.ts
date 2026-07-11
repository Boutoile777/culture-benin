import type { Story } from "@/domain/entities/Story";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const STORIES_MOCK: Story[] = [
  {
    id: "agodjie-guerrieres-danxome",
    cityName: "Abomey",
    category: "Résistance",
    title: "Les Agodjié, guerrières du Danxomè",
    excerpt:
      "L'histoire du seul corps militaire féminin régulier de l'histoire moderne.",
    content:
      "Recrutées dès l'adolescence et soumises à un entraînement d'une dureté légendaire, les Agodjié formaient jusqu'à un tiers de l'armée du royaume du Danxomè. Chasseresses d'éléphants devenues garde royale puis troupes de choc, elles impressionnèrent jusqu'aux officiers français qui les affrontèrent en 1892. Un temple leur rend aujourd'hui hommage à Abomey, rappelant que l'histoire du royaume ne peut se raconter sans elles.",
    image: wikimediaImage("Abomey Royal Palace.jpg", 1800),
    gallery: [
      wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1600),
      wikimediaImage(
        "The célébration at Abomey(1908). - The veteran amazones( AHOSI ) of the Fon king Béhanzin, Son of Roi Gélé.jpg",
        1600,
      ),
      wikimediaImage("Dahomey amazon2.jpg", 1600),
      wikimediaImage(
        "Sculpture of Amazon Female Warrior - Slave Route - Ouidah - Benin.jpg",
        1600,
      ),
    ],
  },
  {
    id: "route-des-esclaves",
    cityName: "Ouidah",
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
    testimonies: [
      {
        id: "route-esclaves-multimedia-1",
        type: "audio",
        title: "Doho de Taiho — histoire d'un captif",
        speaker: "Enregistrement d'archive, 1931 (domaine public)",
        image: wikimediaImage(
          "Ouidah-Esplanade de la Porte du Non-Retour-Côté océan (1).jpg",
          1200,
        ),
        transcript:
          "Enregistrement sonore d'archive daté de 1931, réalisé lors d'une exposition coloniale : un récit narrant l'histoire d'un captif. Un document sensible, à écouter avec le recul de son contexte d'origine.",
        duration: "3 min 11",
        mediaUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Doho%20de%20Taiho%20-%20histoire%20d%27un%20captif.ogg",
      },
    ],
  },
  {
    id: "ganvie-paix-sur-eau",
    cityName: "Ganvié",
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
    cityName: "Ouidah",
    category: "Spiritualité",
    title: "Le Vodoun, religion du vivant",
    excerpt:
      "Chaque 10 janvier, Ouidah devient l'épicentre mondial du culte vodoun.",
    content:
      "Reconnue fête nationale en 1993, la Fête du Vodoun rassemble chaque année dignitaires, couvents et dizaines de milliers de fidèles sur la plage de Ouidah. Libations, danses de possession, sorties de masques Egungun et Zangbeto rythment une journée devenue aussi un grand rendez-vous des diasporas et — depuis 2024 — le festival international « Vodun Days ».",
    image: wikimediaImage("Vodoun party in Benin.jpg", 1600),
    gallery: [
      wikimediaImage("Fête du vodoun 2022 01.jpg", 1600),
      wikimediaImage("Fête du vodoun 2022 05.jpg", 1600),
      wikimediaImage("Adeptes du vodun.jpg", 1600),
      wikimediaImage("DANSE EGUNGUN AU BENIN 01.jpg", 1600),
    ],
  },
  {
    id: "tortue-ruse-conte",
    category: "Conte",
    title: "La Tortue, maîtresse de la ruse",
    excerpt:
      "Un conte transmis de génération en génération autour du feu, où la ruse triomphe de la force.",
    content:
      "Un jour, le Léopard organisa un grand concours pour désigner l'animal le plus fort de la forêt, persuadé de le remporter sans effort. La Tortue, trop lente pour rivaliser de vitesse, proposa plutôt une épreuve d'endurance à la corde contre le Léopard d'un côté et l'Hippopotame de l'autre — sans jamais leur dire qu'ils tiraient l'un contre l'autre. Chacun, croyant affronter la petite Tortue, tira de toutes ses forces pendant des heures sans jamais gagner de terrain. Épuisés, les deux géants durent reconnaître la victoire de la Tortue. Ce conte, raconté aux veillées dans tout le Bénin, rappelle qu'il n'est pas de vantard que la ruse ne puisse remettre à sa place.",
    image: wikimediaImage("Tortoise portrait.JPG", 1600),
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
  {
    id: "cameleon-messager-mort-conte",
    category: "Conte",
    title: "Comment le Caméléon devint messager de la Mort",
    excerpt:
      "Un mythe partagé en Afrique de l'Ouest sur l'origine de la mort et la lenteur du caméléon.",
    content:
      "Le Créateur envoya un jour le Caméléon porter aux hommes le message de la vie éternelle. Mais le Caméléon, comme à son habitude, avançait avec une lenteur extrême, hésitant à chaque pas. Impatient, le Créateur envoya ensuite le Lézard porter un second message : celui de la mort. Le Lézard, rapide et pressé, arriva le premier chez les hommes et leur délivra son message. C'est ainsi, raconte-t-on, que la mort entra dans le monde avant la promesse de vie éternelle — et que le Caméléon, depuis, avance toujours avec cette prudence qui lui a coûté si cher.",
    image: wikimediaImage("Nice chameleon portrait.jpg", 1600),
  },
  {
    id: "lievre-hyene-puits-conte",
    category: "Conte",
    title: "Le Lièvre et l'Hyène au puits",
    excerpt:
      "Un conte de sécheresse où la ruse du Lièvre déjoue la force de l'Hyène.",
    content:
      "Lors d'une grande sécheresse, tous les animaux creusèrent ensemble un puits — tous, sauf le Lièvre, trop malin pour se fatiguer. Quand l'eau jaillit enfin, les autres lui interdirent d'en boire. La nuit venue, le Lièvre revint seul et se couvrit de glu pour puiser l'eau sans laisser de traces suspectes. Mais l'Hyène, postée en embuscade, le surprit collé au piège qu'elle avait tendu. Le Lièvre, sans se démonter, la convainquit qu'elle tenait plutôt un trésor caché — et pendant qu'elle courait chercher de quoi le transporter, il s'échappa. On raconte encore ce conte pour rappeler que la ruse trouve toujours une sortie, même prise au piège.",
    image: wikimediaImage(
      "021 African savanna hare in the Serengeti National Park Photo by Giles Laurent.jpg",
      1600,
    ),
  },
  {
    id: "tambour-parlant-conte",
    category: "Conte",
    title: "Le tambour qui apprit à parler",
    excerpt:
      "Comment le tambour parlant est devenu la voix des rois et des messagers du Danxomè.",
    content:
      "On raconte qu'un jeune griot, désespéré de ne pouvoir porter ses messages assez vite d'un village à l'autre, façonna un tambour dont il resserra les cordes jusqu'à ce que sa peau imite les tons de la langue fon. Bientôt, ce tambour ne battait plus seulement un rythme : il parlait, saluait, annonçait les naissances et les deuils. Les rois du Danxomè en firent un instrument de cour, capable de transmettre un message de colline en colline plus vite qu'un messager à pied. Aujourd'hui encore, dans certaines cérémonies, le tambour parlant continue de raconter ce que la voix humaine ne peut porter aussi loin.",
    image: wikimediaImage("African traditional talking drum artist.jpg", 1600),
    testimonies: [
      {
        id: "tambour-parlant-multimedia-1",
        type: "video",
        title: "Le tambour parlant en démonstration",
        speaker: "Extrait vidéo libre de droits — Wikimedia Commons",
        image: wikimediaImage("African traditional talking drum artist.jpg", 1200),
        transcript:
          "Démonstration d'un tambour parlant, instrument traditionnel ouest-africain utilisé pour transmettre des messages de village en village — illustration vivante du conte.",
        mediaUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Tumpani%20(Talking%20drum).webm",
      },
    ],
  },
  {
    id: "calebasse-maitre-conte",
    category: "Conte",
    title: "La calebasse qui choisit son maître",
    excerpt:
      "Un conte sur l'humilité, où deux sœurs reçoivent chacune ce qu'elles méritent.",
    content:
      "Deux sœurs partirent un jour chercher de l'eau. La cadette, généreuse, partagea son repas avec une vieille femme rencontrée en chemin ; en récompense, celle-ci lui offrit une petite calebasse ordinaire. L'aînée, pressée et arrogante, refusa de s'arrêter et se vit offrir, par dépit de la vieille femme, la plus belle calebasse du village. De retour chez elles, la calebasse de la cadette, une fois ouverte, se remplit de grains, de tissus et de bijoux. Celle de l'aînée, en s'ouvrant, ne libéra que guêpes et malheurs. Depuis, on raconte ce conte aux enfants pour rappeler qu'une calebasse, comme une réputation, vaut ce que porte le cœur de celui qui la reçoit.",
    image: wikimediaImage(
      "Lagenaria siceraria var peregrina MHNT.BOT.2013.22.54.jpg",
      1600,
    ),
  },
];
