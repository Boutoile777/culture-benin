import type { Difficulty } from "@/domain/entities/Difficulty";
import type { QuizQuestion } from "@/domain/entities/QuizQuestion";

export interface QuizRepository {
  getQuestions(token: string, difficulty: Difficulty): Promise<QuizQuestion[]>;
}
