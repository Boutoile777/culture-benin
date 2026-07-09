import type { MemoryItem } from "@/domain/entities/MemoryItem";
import type { MemoryRepository } from "@/domain/repositories/MemoryRepository";
import { MEMORY_ITEMS_MOCK } from "@/data/datasources/local/memoryItems.mock";

export class MemoryRepositoryImpl implements MemoryRepository {
  async getItems(): Promise<MemoryItem[]> {
    return [...MEMORY_ITEMS_MOCK];
  }
}
