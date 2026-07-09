import type { ReactNode } from "react";
import { SiteHeader } from "@/presentation/components/common/SiteHeader";
import { SiteFooter } from "@/presentation/components/common/SiteFooter";
import { LoginDialog } from "@/presentation/components/auth/LoginDialog";
import { SignupDialog } from "@/presentation/components/auth/SignupDialog";
import { ChatbotWidget } from "@/presentation/components/chatbot/ChatbotWidget";
import { useAuth } from "@/presentation/contexts/AuthContext";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { authDialog } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      {children}
      <SiteFooter />
      {authDialog === "login" && <LoginDialog />}
      {authDialog === "signup" && <SignupDialog />}
      <ChatbotWidget />
    </div>
  );
}
