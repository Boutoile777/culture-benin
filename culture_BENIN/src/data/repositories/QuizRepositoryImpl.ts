import type { QuizQuestion } from "@/domain/entities/QuizQuestion";
import type { QuizRepository } from "@/domain/repositories/QuizRepository";
import { QUIZ_QUESTIONS_MOCK } from "@/data/datasources/local/quiz.mock";

export class QuizRepositoryImpl implements QuizRepository {
  async getQuestions(): Promise<QuizQuestion[]> {
    return [...QUIZ_QUESTIONS_MOCK];
  }
}
