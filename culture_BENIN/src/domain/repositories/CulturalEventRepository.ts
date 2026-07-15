import type { CulturalEvent } from "@/domain/entities/CulturalEvent";

export interface CulturalEventRepository {
  getAll(): Promise<CulturalEvent[]>;
  getByCityName(cityName: string): Promise<CulturalEvent[]>;
  getById(id: string): Promise<CulturalEvent | null>;
}
