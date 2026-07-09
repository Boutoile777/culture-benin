import type { MemoryItem } from "@/domain/entities/MemoryItem";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const MEMORY_ITEMS_MOCK: MemoryItem[] = [
  {
    id: "porte",
    name: "Porte du Non-Retour",
    image: wikimediaImage("Door of no return.jpg", 1000),
  },
  {
    id: "palais",
    name: "Palais royaux d'Abomey",
    image: wikimediaImage("Abomey Royal Palace.jpg", 1000),
  },
  {
    id: "mosquee",
    name: "Grande Mosquée de Porto-Novo",
    image: wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1000),
  },
  {
    id: "ganvie",
    name: "Ganvié",
    image: wikimediaImage("Stilt houses in Ganvié (33680913086).jpg", 1000),
  },
  {
    id: "vodoun",
    name: "Fête du Vodoun",
    image: wikimediaImage("Vodoun party in Benin.jpg", 1000),
  },
  {
    id: "behanzin",
    name: "Béhanzin",
    image: wikimediaImage("Behanzin-1895.jpg", 1000),
  },
];
