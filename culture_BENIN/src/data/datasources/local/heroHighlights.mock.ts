import { wikimediaImage } from "@/shared/utils/wikimedia";

export interface HeroHighlight {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export const HERO_HIGHLIGHTS_MOCK: HeroHighlight[] = [
  {
    id: "chutes-kota",
    image: wikimediaImage("Chutes de Kota (2).jpg", 1800),
    title: "Chutes de Kota",
    subtitle: "Cascades sacrées de l'Atacora, près de Natitingou",
  },
  {
    id: "cavaliers-gaani",
    image: wikimediaImage("Plaisir d'un équestre au Benin. 22.jpg", 1800),
    title: "Cavaliers de la Gaani",
    subtitle: "Fête équestre des princes baribas, Nikki ",
  },
];
