import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";

export interface HistoricalFigureRepository {
  getByCityId(cityId: string): Promise<HistoricalFigure[]>;
  getById(id: string): Promise<HistoricalFigure | null>;
}
