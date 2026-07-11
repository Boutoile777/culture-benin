import type { Difficulty } from "@/domain/entities/Difficulty";
import type { QuizQuestion } from "@/domain/entities/QuizQuestion";
import type { QuizRepository } from "@/domain/repositories/QuizRepository";
import { apiFetch } from "@/infrastructure/api/httpClient";

export class QuizRepositoryImpl implements QuizRepository {
  async getQuestions(token: string, difficulty: Difficulty): Promise<QuizQuestion[]> {
    return apiFetch<QuizQuestion[]>(`/quiz/questions?difficulty=${difficulty}`, { token });
  }
}
