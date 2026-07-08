import type { Site } from "@/domain/entities/Site";

export interface SiteRepository {
  getByCityId(cityId: string): Promise<Site[]>;
  getById(id: string): Promise<Site | null>;
}
