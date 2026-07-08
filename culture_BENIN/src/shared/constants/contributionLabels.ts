import type { ContributionType } from "@/domain/entities/Contribution";

export const CONTRIBUTION_TYPE_LABELS: Record<ContributionType, string> = {
  historical_text: "Texte historique",
  image: "Image",
  video: "Vidéo",
  audio: "Audio",
  testimony: "Témoignage",
  cultural_document: "Document culturel",
};
