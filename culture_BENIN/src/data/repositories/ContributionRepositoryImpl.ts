import type { Contribution } from "@/domain/entities/Contribution";
import type { ContributionRepository } from "@/domain/repositories/ContributionRepository";
import { CONTRIBUTIONS_MOCK } from "@/data/datasources/local/contributions.mock";

const contributions: Contribution[] = [...CONTRIBUTIONS_MOCK];

export class ContributionRepositoryImpl implements ContributionRepository {
  async getByUserId(userId: string): Promise<Contribution[]> {
    return contributions.filter((c) => c.authorId === userId);
  }

  async getRecent(limit: number): Promise<Contribution[]> {
    return [...contributions]
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
      .slice(0, limit);
  }

  async create(
    contribution: Omit<Contribution, "id" | "status" | "submittedAt">,
  ): Promise<Contribution> {
    const created: Contribution = {
      ...contribution,
      id: crypto.randomUUID(),
      status: "pending",
      submittedAt: new Date().toISOString().slice(0, 10),
    };
    contributions.push(created);
    return created;
  }
}
