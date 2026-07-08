import type { TrueFalseStatement } from "@/domain/entities/TrueFalseStatement";

export interface TrueFalseRepository {
  getStatements(): Promise<TrueFalseStatement[]>;
}
