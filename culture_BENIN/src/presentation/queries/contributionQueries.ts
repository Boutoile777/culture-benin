import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Contribution } from "@/domain/entities/Contribution";
import { contributionRepository } from "@/infrastructure/config/repositories";

export const contributionKeys = {
  all: ["contributions"] as const,
  byUser: (userId: string) => ["contributions", "user", userId] as const,
};

export function useUserContributions(userId: string | undefined) {
  return useQuery({
    queryKey: contributionKeys.byUser(userId ?? ""),
    queryFn: () => contributionRepository.getByUserId(userId!),
    enabled: Boolean(userId),
  });
}

export function useCreateContribution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      contribution: Omit<Contribution, "id" | "status" | "submittedAt">,
    ) => contributionRepository.create(contribution),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contributionKeys.all });
    },
  });
}
