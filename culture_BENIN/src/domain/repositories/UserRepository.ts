import type { User } from "@/domain/entities/User";

export interface UserRepository {
  getCurrentUser(): Promise<User | null>;
  login(name: string): Promise<User>;
  logout(): Promise<void>;
  toggleFavoriteCity(userId: string, cityId: string): Promise<User>;
}
