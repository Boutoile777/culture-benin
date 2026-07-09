import type { MapPoint } from "@/domain/entities/MapPoint";

export interface MapPointFilter {
  query?: string;
}

export interface MapRepository {
  getPoints(filter?: MapPointFilter): Promise<MapPoint[]>;
}
