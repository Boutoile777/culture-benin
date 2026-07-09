import type { MemoryItem } from "@/domain/entities/MemoryItem";

export interface MemoryRepository {
  getItems(): Promise<MemoryItem[]>;
}
