import type { Tradition } from "@/domain/entities/Tradition";
import type { TraditionRepository } from "@/domain/repositories/TraditionRepository";
import { TRADITIONS_MOCK } from "@/data/datasources/local/traditions.mock";

export class TraditionRepositoryImpl implements TraditionRepository {
  async getAll(): Promise<Tradition[]> {
    return [...TRADITIONS_MOCK];
  }

  async getByCityName(cityName: string): Promise<Tradition[]> {
    return TRADITIONS_MOCK.filter((tradition) => tradition.cityName === cityName);
  }

  async getById(id: string): Promise<Tradition | null> {
    return TRADITIONS_MOCK.find((tradition) => tradition.id === id) ?? null;
  }
}
