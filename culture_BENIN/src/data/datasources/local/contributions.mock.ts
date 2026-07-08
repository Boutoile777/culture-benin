import type { Contribution } from "@/domain/entities/Contribution";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const CONTRIBUTIONS_MOCK: Contribution[] = [
  {
    id: "chants-peche-nokoue",
    authorId: "r-houngbedji",
    authorName: "R. Houngbédji",
    type: "audio",
    cityId: "ganvie",
    category: "traditions_rites",
    title: "Chants de pêche du lac Nokoué",
    description:
      "Enregistrement des chants entonnés par les pêcheurs de Ganvié lors de la relève des enclos acadja à l'aube.",
    attachmentUrls: [wikimediaImage("Ganvie market.jpg", 1600)],
    status: "approved",
    submittedAt: "2026-06-30",
  },
  {
    id: "metier-tisserand-abomey",
    authorId: "c-agossou",
    authorName: "C. Agossou",
    type: "testimony",
    cityId: "abomey",
    category: "arts_crafts",
    title: "Le métier de tisserand à Abomey",
    description:
      "Témoignage d'un artisan de la famille Yèmadjè sur la transmission des tentures appliquées de la cour royale.",
    attachmentUrls: [wikimediaImage("Abomey Royal Palace.jpg", 1800)],
    status: "approved",
    submittedAt: "2026-06-25",
  },
  {
    id: "facades-afro-bresiliennes-porto-novo",
    authorId: "m-da-silva",
    authorName: "M. da Silva",
    type: "image",
    cityId: "portonovo",
    category: "sites_monuments",
    title: "Façades afro-brésiliennes restaurées",
    description:
      "Reportage photo sur la restauration des demeures Aguda du centre historique de Porto-Novo.",
    attachmentUrls: [wikimediaImage("Grande Mosquée de Porto-Novo.jpg", 1800)],
    status: "approved",
    submittedAt: "2026-06-18",
  },
];
