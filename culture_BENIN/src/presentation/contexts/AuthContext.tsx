import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  initials: string;
}

export type AuthDialog = "login" | "signup" | null;

interface AuthContextValue {
  user: AuthUser | null;
  login: (name: string, email?: string) => void;
  logout: () => void;
  authDialog: AuthDialog;
  openLogin: () => void;
  openSignup: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authDialog, setAuthDialog] = useState<AuthDialog>(null);

  const login = useCallback((name: string, email?: string) => {
    const trimmed = name.trim();
    setUser({
      id: crypto.randomUUID(),
      name: trimmed,
      email: email?.trim() || undefined,
      initials: trimmed.charAt(0).toUpperCase(),
    });
    setAuthDialog(null);
  }, []);

  const logout = useCallback(() => setUser(null), []);
  const openLogin = useCallback(() => setAuthDialog("login"), []);
  const openSignup = useCallback(() => setAuthDialog("signup"), []);
  const closeAuthDialog = useCallback(() => setAuthDialog(null), []);

  const value = useMemo(
    () => ({ user, login, logout, authDialog, openLogin, openSignup, closeAuthDialog }),
    [user, login, logout, authDialog, openLogin, openSignup, closeAuthDialog],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
