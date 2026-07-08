import type { QuizQuestion } from "@/domain/entities/QuizQuestion";

export interface QuizRepository {
  getQuestions(): Promise<QuizQuestion[]>;
}
