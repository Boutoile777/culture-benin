import type { Contribution } from "@/domain/entities/Contribution";

export interface ContributionRepository {
  getByUserId(userId: string): Promise<Contribution[]>;
  getRecent(limit: number): Promise<Contribution[]>;
  create(
    contribution: Omit<Contribution, "id" | "status" | "submittedAt">,
  ): Promise<Contribution>;
}
