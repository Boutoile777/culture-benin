import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "@/shared/constants/homeStaticContent";
import { BrandLogo } from "@/presentation/components/common/BrandLogo";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { cityRepository } from "@/infrastructure/config/repositories";
import { getFullName, getInitials } from "@/shared/utils/userDisplay";
import type { City } from "@/domain/entities/City";

const ACCOUNT_MENU_LINKS = [
  { label: "Mon profil", path: "/compte" },
  { label: "Mes favoris", path: "/compte/favoris" },
  { label: "Mes contributions", path: "/compte/contributions" },
  { label: "Paramètres", path: "/compte/parametres" },
];

function CitySearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" />
    </svg>
  );
}

function CitySearch({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    cityRepository.getAll().then((result) => {
      if (!cancelled) setCities(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return cities
      .filter(
        (city) =>
          city.name.toLowerCase().includes(normalized) ||
          city.region.toLowerCase().includes(normalized) ||
          city.theme.toLowerCase().includes(normalized),
      )
      .slice(0, 6);
  }, [cities, query]);

  const goToCity = (city: City) => {
    navigate(`/explorer/${city.id}`);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <CitySearchIcon />
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && results[0]) goToCity(results[0]);
          if (event.key === "Escape") setIsOpen(false);
        }}
        placeholder="Rechercher une ville…"
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-9 pr-4 text-[13px] text-culture-ink focus:outline-none focus:ring-2 focus:ring-culture-green"
      />

      {isOpen && results.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white py-1.5 shadow-[0_16px_36px_rgba(32,33,36,0.16)]">
            {results.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => goToCity(city)}
                className="flex w-full flex-col items-start px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-50"
              >
                <span className="text-[13.5px] font-semibold text-culture-ink">
                  {city.name}
                </span>
                <span className="text-[11.5px] text-gray-500">{city.region}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function SiteHeader() {
  const { user, logout, openLogin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-[0_1px_0_rgba(32,33,36,0.04)] backdrop-blur-sm">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <NavLink to="/" className="w-fit">
          <BrandLogo />
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            return item.path ? (
              <NavLink
                key={item.label}
                to={item.path}
                end
                className={({ isActive }: { isActive: boolean }) =>
                  `whitespace-nowrap border-b-2 px-3.5 py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "border-culture-green font-bold text-culture-ink"
                      : "border-transparent font-medium text-gray-400 hover:text-culture-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.label}
                className="cursor-default whitespace-nowrap border-b-2 border-transparent px-3.5 py-2 text-sm font-medium text-gray-400"
              >
                {item.label}
              </span>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <CitySearch className="w-[210px]" />

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen((current) => !current)}
                aria-expanded={isAccountMenuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-culture-green text-[13px] font-semibold text-white transition-transform duration-200 hover:scale-105"
              >
                {getInitials(user)}
              </button>

              {isAccountMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsAccountMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white py-2 shadow-[0_16px_36px_rgba(32,33,36,0.16)]">
                    <div className="border-b border-gray-100 px-4 pb-2.5">
                      <span className="block text-[13.5px] font-semibold text-culture-ink">
                        {getFullName(user)}
                      </span>
                      <span className="block truncate text-[12px] text-gray-500">
                        {user.email}
                      </span>
                    </div>
                    <div className="py-1.5">
                      {ACCOUNT_MENU_LINKS.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          end={link.path === "/compte"}
                          className={({ isActive }: { isActive: boolean }) =>
                            `block px-4 py-2 text-[13.5px] transition-colors duration-200 ${
                              isActive
                                ? "bg-[#eef4ef] font-semibold text-culture-green"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={logout}
                      className="block w-full border-t border-gray-100 px-4 py-2.5 text-left text-[13.5px] font-semibold text-culture-terracotta transition-colors duration-200 hover:bg-gray-50"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={openLogin}
              className="whitespace-nowrap rounded-full bg-culture-green px-[18px] py-2 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
            >
              Se connecter
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-culture-ink transition-colors hover:bg-gray-100 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-5 w-5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.path ? (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end
                  className={({ isActive }: { isActive: boolean }) =>
                    `rounded-lg px-3 py-2.5 text-[15px] ${
                      isActive
                        ? "bg-[#eef4ef] font-bold text-culture-ink"
                        : "font-medium text-gray-500"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <span
                  key={item.label}
                  className="cursor-default px-3 py-2.5 text-[15px] font-medium text-gray-400"
                >
                  {item.label}
                </span>
              ),
            )}
          </nav>

          <CitySearch className="mt-4" />

          <div className="mt-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-culture-green text-[13px] font-semibold text-white">
                    {getInitials(user)}
                  </span>
                  <span className="text-sm font-semibold text-culture-ink">
                    {getFullName(user)}
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  {ACCOUNT_MENU_LINKS.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === "/compte"}
                      className={({ isActive }: { isActive: boolean }) =>
                        `rounded-lg px-3 py-2 text-[14px] ${
                          isActive
                            ? "bg-[#eef4ef] font-bold text-culture-ink"
                            : "font-medium text-gray-500"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <button
                  type="button"
                  onClick={logout}
                  className="self-start whitespace-nowrap rounded-full border border-gray-300 px-4 py-2 text-[13px] font-semibold text-gray-500 transition-colors duration-200 hover:border-culture-terracotta hover:text-culture-terracotta"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                className="w-full rounded-full bg-culture-green py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                Se connecter
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
