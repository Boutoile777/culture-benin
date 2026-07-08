export type QuickLinkIcon = "compass" | "mapPin" | "bookOpen" | "uploadCloud";
export type QuickLinkAccent = "green" | "terracotta";

export interface QuickLink {
  icon: QuickLinkIcon;
  accent: QuickLinkAccent;
  kicker: string;
  title: string;
  description: string;
}

export const QUICK_LINKS: QuickLink[] = [
  {
    icon: "compass",
    accent: "green",
    kicker: "Explorer",
    title: "Explorer une ville",
    description:
      "Ouidah, Abomey, Porto-Novo, Ganvié — plongez dans des visites guidées virtuelles, quartier par quartier, récit par récit.",
  },
  {
    icon: "mapPin",
    accent: "terracotta",
    kicker: "S'orienter",
    title: "La carte culturelle",
    description:
      "Repérez chaque site sacré, musée ou monument sur Google Maps et lancez l'itinéraire depuis votre position en un clic.",
  },
  {
    icon: "bookOpen",
    accent: "green",
    kicker: "Apprendre",
    title: "Les jeux culturels",
    description:
      "Quiz, devinettes, vrai ou faux, reconnaissance de lieux — testez et affûtez votre culture béninoise en vous amusant.",
  },
  {
    icon: "uploadCloud",
    accent: "terracotta",
    kicker: "Transmettre",
    title: "Contribuer",
    description:
      "Partagez récits, images, sons et témoignages : chaque contribution enrichit la mémoire collective du Bénin.",
  },
];

export interface CollectionStat {
  value: string;
  label: string;
  description: string;
}

export const COLLECTION_STATS: CollectionStat[] = [
  {
    value: "1 240",
    label: "Photographies",
    description: "Sites, rites et vie quotidienne",
  },
  {
    value: "186",
    label: "Vidéos & visites 360°",
    description: "Immersions et documentaires",
  },
  {
    value: "312",
    label: "Archives sonores",
    description: "Chants, contes et récits oraux",
  },
  {
    value: "95",
    label: "Documents historiques",
    description: "Cartes, traités et manuscrits",
  },
];

export interface NavItem {
  label: string;
  path: string | null;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", path: "/" },
  { label: "Explorer", path: null },
  { label: "Carte", path: "/carte" },
  { label: "Jouer", path: null },
  { label: "Contribuer", path: "/contribuer" },
];
