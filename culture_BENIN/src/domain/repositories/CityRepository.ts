import type { City } from "@/domain/entities/City";

export interface CityRepository {
  getAll(): Promise<City[]>;
  getById(id: string): Promise<City | null>;
  search(query: string): Promise<City[]>;
}
