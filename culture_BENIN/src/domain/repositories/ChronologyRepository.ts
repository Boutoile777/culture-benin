import type { ChronologyItem } from "@/domain/entities/ChronologyItem";

export interface ChronologyRepository {
  getItems(): Promise<ChronologyItem[]>;
}
