import type { User } from "@/domain/entities/User";
import type {
  AuthRepository,
  AuthSession,
  LoginInput,
  RegisterInput,
} from "@/domain/repositories/AuthRepository";
import { apiFetch } from "@/infrastructure/api/httpClient";

interface RawAuthSession {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
  };
}

interface RawUserMe {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

export class AuthRepositoryImpl implements AuthRepository {
  async login(input: LoginInput): Promise<AuthSession> {
    return apiFetch<RawAuthSession>("/auth/login", { method: "POST", body: input });
  }

  async register(input: RegisterInput): Promise<AuthSession> {
    return apiFetch<RawAuthSession>("/auth/register", { method: "POST", body: input });
  }

  async getProfile(token: string): Promise<User> {
    const raw = await apiFetch<RawUserMe>("/users/me", { token });
    return {
      id: raw._id,
      email: raw.email,
      firstname: raw.firstname,
      lastname: raw.lastname,
      role: raw.role,
    };
  }
}
