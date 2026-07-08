import type { MediaResources } from "@/domain/entities/MediaResources";

export interface Site {
  id: string;
  cityId: string;
  category: string;
  name: string;
  description: string;
  image?: string;
  narrative?: string;
  media?: MediaResources;
}
