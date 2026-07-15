import type { Tradition } from "@/domain/entities/Tradition";

export interface TraditionRepository {
  getAll(): Promise<Tradition[]>;
  getByCityName(cityName: string): Promise<Tradition[]>;
  getById(id: string): Promise<Tradition | null>;
}
