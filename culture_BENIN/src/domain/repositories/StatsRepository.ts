import type { PlatformStats } from "@/domain/entities/PlatformStats";

export interface StatsRepository {
  getStats(): Promise<PlatformStats>;
}
