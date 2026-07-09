import type { Tradition } from "@/domain/entities/Tradition";

export interface TraditionRepository {
  getAll(): Promise<Tradition[]>;
  getByCityId(cityId: string): Promise<Tradition[]>;
  getById(id: string): Promise<Tradition | null>;
}
