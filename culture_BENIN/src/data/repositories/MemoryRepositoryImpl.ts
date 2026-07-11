import type { Difficulty } from "@/domain/entities/Difficulty";
import type { MemoryItem } from "@/domain/entities/MemoryItem";
import type { MemoryRepository } from "@/domain/repositories/MemoryRepository";
import { apiFetch } from "@/infrastructure/api/httpClient";

// The board is fixed at 12 flipped cards: 6 images + 6 names to match, per level.
const PAIRS_PER_LEVEL = 6;

export class MemoryRepositoryImpl implements MemoryRepository {
  async getItems(token: string, difficulty: Difficulty): Promise<MemoryItem[]> {
    const items = await apiFetch<MemoryItem[]>(
      `/memory/items?difficulty=${difficulty}&limit=${PAIRS_PER_LEVEL}`,
      { token },
    );
    return items.slice(0, PAIRS_PER_LEVEL);
  }
}
