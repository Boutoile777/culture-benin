import type { City } from "@/domain/entities/City";
import type { CityRepository } from "@/domain/repositories/CityRepository";
import { CITIES_MOCK } from "@/data/datasources/local/cities.mock";

export class CityRepositoryImpl implements CityRepository {
  async getAll(): Promise<City[]> {
    return [...CITIES_MOCK].sort((a, b) => a.order - b.order);
  }

  async getById(id: string): Promise<City | null> {
    return CITIES_MOCK.find((city) => city.id === id) ?? null;
  }

  async search(query: string): Promise<City[]> {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return CITIES_MOCK.filter((city) =>
      city.name.toLowerCase().includes(normalized),
    );
  }
}
