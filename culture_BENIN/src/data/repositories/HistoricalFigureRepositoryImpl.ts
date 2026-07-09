import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";
import type { HistoricalFigureRepository } from "@/domain/repositories/HistoricalFigureRepository";
import { HISTORICAL_FIGURES_MOCK } from "@/data/datasources/local/historicalFigures.mock";

export class HistoricalFigureRepositoryImpl implements HistoricalFigureRepository {
  async getAll(): Promise<HistoricalFigure[]> {
    return [...HISTORICAL_FIGURES_MOCK];
  }

  async getByCityId(cityId: string): Promise<HistoricalFigure[]> {
    return HISTORICAL_FIGURES_MOCK.filter((figure) => figure.cityId === cityId);
  }

  async getById(id: string): Promise<HistoricalFigure | null> {
    return HISTORICAL_FIGURES_MOCK.find((figure) => figure.id === id) ?? null;
  }
}
