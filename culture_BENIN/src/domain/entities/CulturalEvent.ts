import type { MediaResources } from "@/domain/entities/MediaResources";

export interface CulturalEvent {
  id: string;
  cityId: string;
  name: string;
  description: string;
  date: string;
  narrative?: string;
  media?: MediaResources;
}
