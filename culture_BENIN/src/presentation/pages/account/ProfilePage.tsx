import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { contributionRepository } from "@/infrastructure/config/repositories";
import { getFullName, getInitials } from "@/shared/utils/userDisplay";

const QUICK_LINKS = [
  {
    path: "/compte/favoris",
    title: "Mes favoris",
    description: "Retrouvez les villes que vous avez mises de côté.",
  },
  {
    path: "/compte/contributions",
    title: "Mes contributions",
    description: "Suivez le statut de vos partages en modération.",
  },
  {
    path: "/compte/parametres",
    title: "Paramètres",
    description: "Modifiez votre nom, votre email ou déconnectez-vous.",
  },
];

export function ProfilePage() {
  const { user } = useAuth();
  const { favoriteIds } = useFavorites();
  const [contributionCount, setContributionCount] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    contributionRepository.getByUserId(user.id).then((result) => {
      if (!cancelled) setContributionCount(result.length);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-[18px] border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-culture-green text-2xl font-semibold text-white">
            {getInitials(user)}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-xl font-semibold text-culture-ink">
              {getFullName(user)}
            </span>
            <span className="text-[13px] text-gray-500">{user.email}</span>
          </div>
        </div>

        <p className="border-t border-gray-100 pt-5 text-[13.5px] leading-relaxed text-gray-500">
          Bienvenue dans votre espace personnel. C'est ici que vous
          retrouverez tout ce que vous avez mis de côté et transmis à la
          communauté Culture+ Bénin.
        </p>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1 rounded-2xl bg-gray-50 p-5">
            <span className="font-display text-[26px] font-semibold text-culture-green">
              {favoriteIds.size}
            </span>
            <span className="text-[13px] font-semibold text-culture-ink">
              Ville{favoriteIds.size > 1 ? "s" : ""} favorite
              {favoriteIds.size > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl bg-gray-50 p-5">
            <span className="font-display text-[26px] font-semibold text-culture-green">
              {contributionCount ?? "—"}
            </span>
            <span className="text-[13px] font-semibold text-culture-ink">
              Contribution{(contributionCount ?? 0) > 1 ? "s" : ""} soumise
              {(contributionCount ?? 0) > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex flex-col gap-1.5 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-culture-green hover:shadow-[0_10px_24px_rgba(32,33,36,0.1)]"
          >
            <span className="text-[13.5px] font-semibold text-culture-ink">
              {link.title}
            </span>
            <span className="text-[12.5px] leading-relaxed text-gray-500">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
