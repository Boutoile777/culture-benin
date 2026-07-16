import type { PlatformStats } from "@/domain/entities/PlatformStats";
import type { StatsRepository } from "@/domain/repositories/StatsRepository";
import { apiFetch } from "@/infrastructure/api/httpClient";

export class StatsRepositoryImpl implements StatsRepository {
  getStats(): Promise<PlatformStats> {
    return apiFetch<PlatformStats>("/stats");
  }
}
