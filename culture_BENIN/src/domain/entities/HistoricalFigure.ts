import type { MediaResources } from "@/domain/entities/MediaResources";

export interface HistoricalFigure {
  id: string;
  cityId: string;
  name: string;
  role: string;
  initials: string;
  biography: string;
  media?: MediaResources;
}
