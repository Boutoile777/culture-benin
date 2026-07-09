import type { ChronologyItem } from "@/domain/entities/ChronologyItem";
import type { ChronologyRepository } from "@/domain/repositories/ChronologyRepository";
import { CHRONOLOGY_ITEMS_MOCK } from "@/data/datasources/local/chronology.mock";

export class ChronologyRepositoryImpl implements ChronologyRepository {
  async getItems(): Promise<ChronologyItem[]> {
    return [...CHRONOLOGY_ITEMS_MOCK];
  }
}
