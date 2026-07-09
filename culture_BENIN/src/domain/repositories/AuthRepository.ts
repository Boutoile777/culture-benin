import type { User } from "@/domain/entities/User";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface AuthSession {
  accessToken: string;
  user: User;
}

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthSession>;
  register(input: RegisterInput): Promise<AuthSession>;
  getProfile(token: string): Promise<User>;
}
