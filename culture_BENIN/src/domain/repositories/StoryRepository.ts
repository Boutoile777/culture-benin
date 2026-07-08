import type { Story } from "@/domain/entities/Story";

export interface StoryRepository {
  getAll(): Promise<Story[]>;
  getFeatured(limit: number): Promise<Story[]>;
  getById(id: string): Promise<Story | null>;
}
