import type { Testimony } from "@/domain/entities/Testimony";

export interface Site {
  id: string;
  cityId: string;
  category: string;
  name: string;
  description: string;
  image?: string;
  gallery?: string[];
  narrative?: string;
  testimonies?: Testimony[];
}
