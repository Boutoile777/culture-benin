import type { Testimony } from "@/domain/entities/Testimony";

export interface HistoricalFigure {
  id: string;
  cityId: string;
  name: string;
  role: string;
  initials: string;
  biography: string[];
  portrait?: string;
  gallery?: string[];
  testimonies?: Testimony[];
}
