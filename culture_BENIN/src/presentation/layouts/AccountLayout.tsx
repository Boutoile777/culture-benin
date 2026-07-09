import type { JSX } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { useAuth } from "@/presentation/contexts/AuthContext";

const sharedIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function UserIcon() {
  return (
    <svg {...sharedIconProps} className="h-[18px] w-[18px]">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg {...sharedIconProps} className="h-[18px] w-[18px]">
      <path d="M12 20s-7-4.4-9.3-8.8C1.3 8 2.6 5 5.7 4.4 8 4 10 5 12 7.3 14 5 16 4 18.3 4.4 21.4 5 22.7 8 21.3 11.2 19 15.6 12 20 12 20z" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg {...sharedIconProps} className="h-[18px] w-[18px]">
      <rect x="3.5" y="4" width="17" height="4.2" rx="1" />
      <path d="M4.5 8.2v10a1.3 1.3 0 001.3 1.3h12.4a1.3 1.3 0 001.3-1.3v-10" />
      <path d="M10 12.2h4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg {...sharedIconProps} className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.4M12 18.1v2.4M4.6 6.6l1.7 1.7M17.7 15.7l1.7 1.7M3.5 12h2.4M18.1 12h2.4M4.6 17.4l1.7-1.7M17.7 8.3l1.7-1.7" />
    </svg>
  );
}

const ACCOUNT_TABS: { label: string; path: string; end: boolean; icon: () => JSX.Element }[] = [
  { label: "Profil", path: "/compte", end: true, icon: UserIcon },
  { label: "Mes favoris", path: "/compte/favoris", end: false, icon: HeartIcon },
  {
    label: "Mes contributions",
    path: "/compte/contributions",
    end: false,
    icon: ArchiveIcon,
  },
  { label: "Paramètres", path: "/compte/parametres", end: false, icon: SettingsIcon },
];

export function AccountLayout() {
  const { user, openLogin } = useAuth();

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <SectionHeading kicker="Votre espace" title="Mon compte" />
          <p className="mb-2 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Gérez votre profil, retrouvez vos villes favorites, suivez le
            statut de vos contributions et ajustez les paramètres de votre
            compte Culture+ Bénin.
          </p>

          {!user ? (
            <div className="mt-8 max-w-[480px] rounded-[18px] border border-gray-200 bg-white p-8 text-center">
              <p className="text-[14px] leading-relaxed text-gray-500">
                Connectez-vous pour accéder à votre profil, vos favoris et vos
                contributions.
              </p>
              <button
                type="button"
                onClick={openLogin}
                className="mt-5 rounded-full bg-culture-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                Se connecter
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
              <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                {ACCOUNT_TABS.map((tab) => (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    end={tab.end}
                    className={({ isActive }: { isActive: boolean }) =>
                      `flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 ${
                        isActive
                          ? "bg-[#eef4ef] text-culture-green"
                          : "text-gray-500 hover:bg-gray-50 hover:text-culture-ink"
                      }`
                    }
                  >
                    <tab.icon />
                    {tab.label}
                  </NavLink>
                ))}
              </nav>

              <div>
                <Outlet />
              </div>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
