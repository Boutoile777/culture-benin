import type { Site } from "@/domain/entities/Site";
import type { SiteRepository } from "@/domain/repositories/SiteRepository";
import { SITES_MOCK } from "@/data/datasources/local/sites.mock";

export class SiteRepositoryImpl implements SiteRepository {
  async getAll(): Promise<Site[]> {
    return [...SITES_MOCK];
  }

  async getByCityId(cityId: string): Promise<Site[]> {
    return SITES_MOCK.filter((site) => site.cityId === cityId);
  }

  async getById(id: string): Promise<Site | null> {
    return SITES_MOCK.find((site) => site.id === id) ?? null;
  }
}
