import type { MapPoint } from "@/domain/entities/MapPoint";

export interface MapPointFilter {
  category?: string;
  query?: string;
}

export interface MapRepository {
  getPoints(filter?: MapPointFilter): Promise<MapPoint[]>;
}
