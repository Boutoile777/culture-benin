import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/domain/entities/User";
import type { RegisterInput } from "@/domain/repositories/AuthRepository";
import { authRepository } from "@/infrastructure/config/repositories";

const TOKEN_STORAGE_KEY = "culture-benin:auth-token";

export type AuthDialog = "login" | "signup" | null;

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isRestoring: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  authDialog: AuthDialog;
  openLogin: () => void;
  openSignup: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);
  const [authDialog, setAuthDialog] = useState<AuthDialog>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) {
      setIsRestoring(false);
      return;
    }
    authRepository
      .getProfile(storedToken)
      .then((profile) => {
        setUser(profile);
        setToken(storedToken);
      })
      .catch(() => {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      })
      .finally(() => setIsRestoring(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const session = await authRepository.login({ email, password });
    window.localStorage.setItem(TOKEN_STORAGE_KEY, session.accessToken);
    setToken(session.accessToken);
    setUser(session.user);
    setAuthDialog(null);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const session = await authRepository.register(input);
    window.localStorage.setItem(TOKEN_STORAGE_KEY, session.accessToken);
    setToken(session.accessToken);
    setUser(session.user);
    setAuthDialog(null);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const openLogin = useCallback(() => setAuthDialog("login"), []);
  const openSignup = useCallback(() => setAuthDialog("signup"), []);
  const closeAuthDialog = useCallback(() => setAuthDialog(null), []);

  const value = useMemo(
    () => ({
      user,
      token,
      isRestoring,
      login,
      register,
      logout,
      authDialog,
      openLogin,
      openSignup,
      closeAuthDialog,
    }),
    [
      user,
      token,
      isRestoring,
      login,
      register,
      logout,
      authDialog,
      openLogin,
      openSignup,
      closeAuthDialog,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
