import { Link } from "react-router-dom";
import { NAV_ITEMS } from "@/shared/constants/homeStaticContent";
import { BrandLogo } from "@/presentation/components/common/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-[#fafaf8] py-11 text-gray-600">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:gap-10">
        <div>
          <div className="mb-3">
            <BrandLogo size="sm" />
          </div>
          <p className="max-w-[320px] text-[13px] leading-relaxed">
            Le musée numérique interactif du patrimoine béninois. Découvrir,
            explorer, apprendre, jouer, contribuer.
          </p>
          <p className="mt-3.5 max-w-[340px] text-[11.5px] leading-relaxed text-gray-500">
            Photographies : Wikimedia Commons, licences Creative Commons.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[13.5px]">
          <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-culture-ink">
            Explorer
          </span>
          {NAV_ITEMS.slice(1, 3).map((item) =>
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                className="w-fit transition-colors hover:text-culture-green"
              >
                {item.label}
              </Link>
            ) : (
              <span key={item.label}>{item.label}</span>
            ),
          )}
          <span>Jeux culturels</span>
        </div>
        <div className="flex flex-col gap-2 text-[13.5px]">
          <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-culture-ink">
            Participer
          </span>
          <Link to="/contribuer" className="w-fit transition-colors hover:text-culture-green">
            Contribuer
          </Link>
          <span>Mon espace</span>
        </div>
        <div className="flex flex-col gap-2 text-[13.5px]">
          <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-culture-ink">
            Contact
          </span>
          <a
            href="mailto:contact@cultureplusbenin.bj"
            className="transition-colors hover:text-culture-green"
          >
            contact@cultureplusbenin.bj
          </a>
          <span>Cotonou, Bénin</span>
        </div>
      </div>
      <div className="mx-auto mt-7 max-w-7xl border-t border-gray-200 px-4 pt-[18px] text-xs text-gray-500 sm:px-6">
        © 2026 Culture+ Bénin — Plateforme de valorisation du patrimoine
        culturel béninois
      </div>
    </footer>
  );
}
