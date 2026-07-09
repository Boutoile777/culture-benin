import type { CulturalEvent } from "@/domain/entities/CulturalEvent";

export interface CulturalEventRepository {
  getAll(): Promise<CulturalEvent[]>;
  getByCityId(cityId: string): Promise<CulturalEvent[]>;
  getById(id: string): Promise<CulturalEvent | null>;
}
