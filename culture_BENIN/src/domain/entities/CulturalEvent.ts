import type { Testimony } from "@/domain/entities/Testimony";

export interface CulturalEvent {
  id: string;
  cityName: string;
  name: string;
  description: string;
  date: string;
  origin?: string;
  gallery?: string[];
  narrative?: string;
  testimonies?: Testimony[];
}
