import type { MapPoint } from "@/domain/entities/MapPoint";
import type { MapPointFilter, MapRepository } from "@/domain/repositories/MapRepository";
import { MAP_POINTS_MOCK } from "@/data/datasources/local/mapPoints.mock";

export class MapRepositoryImpl implements MapRepository {
  async getPoints(filter?: MapPointFilter): Promise<MapPoint[]> {
    const query = filter?.query?.trim().toLowerCase() ?? "";
    return MAP_POINTS_MOCK.filter((point) => {
      if (!query) return true;
      return (
        point.name.toLowerCase().includes(query) ||
        point.cityId.toLowerCase().includes(query)
      );
    });
  }
}
