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

// Les valeurs des tuiles "Collections multimédias" viennent du backend
// (GET /stats, cf. usePlatformStats) — seul le type de tuile vit encore ici.
export interface CollectionStat {
  value: string;
  label: string;
  description: string;
}

export interface NavItem {
  label: string;
  path: string | null;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", path: "/" },
  { label: "Explorer", path: "/explorer" },
  { label: "Carte", path: "/carte" },
  { label: "Jouer", path: "/jouer" },
  { label: "Contribuer", path: "/contribuer" },
];
