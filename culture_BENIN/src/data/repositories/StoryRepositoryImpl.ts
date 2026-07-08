import type { Story } from "@/domain/entities/Story";
import type { StoryRepository } from "@/domain/repositories/StoryRepository";
import { STORIES_MOCK } from "@/data/datasources/local/stories.mock";

export class StoryRepositoryImpl implements StoryRepository {
  async getAll(): Promise<Story[]> {
    return [...STORIES_MOCK];
  }

  async getFeatured(limit: number): Promise<Story[]> {
    return STORIES_MOCK.slice(0, limit);
  }

  async getById(id: string): Promise<Story | null> {
    return STORIES_MOCK.find((story) => story.id === id) ?? null;
  }
}
