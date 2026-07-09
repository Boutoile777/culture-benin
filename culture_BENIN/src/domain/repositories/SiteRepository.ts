import type { Site } from "@/domain/entities/Site";

export interface SiteRepository {
  getAll(): Promise<Site[]>;
  getByCityId(cityId: string): Promise<Site[]>;
  getById(id: string): Promise<Site | null>;
}
