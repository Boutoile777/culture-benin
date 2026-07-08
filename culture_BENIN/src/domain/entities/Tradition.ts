import type { MediaResources } from "@/domain/entities/MediaResources";

export interface Tradition {
  id: string;
  cityId: string;
  name: string;
  description: string;
  narrative?: string;
  media?: MediaResources;
}
