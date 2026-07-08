import type { Tradition } from "@/domain/entities/Tradition";

export interface TraditionRepository {
  getByCityId(cityId: string): Promise<Tradition[]>;
  getById(id: string): Promise<Tradition | null>;
}
