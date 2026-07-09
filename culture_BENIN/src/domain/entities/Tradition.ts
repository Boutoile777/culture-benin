import type { Testimony } from "@/domain/entities/Testimony";

export interface Tradition {
  id: string;
  cityId: string;
  name: string;
  description: string;
  narrative?: string;
  gallery?: string[];
  testimonies?: Testimony[];
}
