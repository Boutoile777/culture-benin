import type { ReactNode } from "react";
import { SiteHeader } from "@/presentation/components/common/SiteHeader";
import { SiteFooter } from "@/presentation/components/common/SiteFooter";
import { LoginDialog } from "@/presentation/components/auth/LoginDialog";
import { SignupDialog } from "@/presentation/components/auth/SignupDialog";
import { useAuth } from "@/presentation/contexts/AuthContext";

interface MainLayoutProps {
  children: ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function MainLayout({
  children,
  searchValue,
  onSearchChange,
}: MainLayoutProps) {
  const { authDialog } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader searchValue={searchValue} onSearchChange={onSearchChange} />
      {children}
      <SiteFooter />
      {authDialog === "login" && <LoginDialog />}
      {authDialog === "signup" && <SignupDialog />}
    </div>
  );
}
