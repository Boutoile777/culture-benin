import type { CulturalEvent } from "@/domain/entities/CulturalEvent";
import type { CulturalEventRepository } from "@/domain/repositories/CulturalEventRepository";
import { CULTURAL_EVENTS_MOCK } from "@/data/datasources/local/culturalEvents.mock";

export class CulturalEventRepositoryImpl implements CulturalEventRepository {
  async getAll(): Promise<CulturalEvent[]> {
    return [...CULTURAL_EVENTS_MOCK].sort((a, b) => a.date.localeCompare(b.date));
  }

  async getByCityName(cityName: string): Promise<CulturalEvent[]> {
    return CULTURAL_EVENTS_MOCK.filter((event) => event.cityName === cityName);
  }

  async getById(id: string): Promise<CulturalEvent | null> {
    return CULTURAL_EVENTS_MOCK.find((event) => event.id === id) ?? null;
  }
}
