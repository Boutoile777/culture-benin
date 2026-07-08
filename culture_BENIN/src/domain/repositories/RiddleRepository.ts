import type { Riddle } from "@/domain/entities/Riddle";

export interface RiddleRepository {
  getAll(): Promise<Riddle[]>;
}
