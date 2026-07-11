import type { Difficulty } from "@/domain/entities/Difficulty";
import type { MemoryItem } from "@/domain/entities/MemoryItem";

export interface MemoryRepository {
  getItems(token: string, difficulty: Difficulty): Promise<MemoryItem[]>;
}
