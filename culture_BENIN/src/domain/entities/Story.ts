import type { Testimony } from "@/domain/entities/Testimony";

export interface Story {
  id: string;
  cityName?: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  gallery?: string[];
  testimonies?: Testimony[];
}
