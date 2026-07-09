import { useAuth } from "@/presentation/contexts/AuthContext";
import { getFullName } from "@/shared/utils/userDisplay";

export function SettingsPage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Informations personnelles
        </h2>
        <p className="mb-4 text-[13px] text-gray-500">
          La modification du profil n'est pas encore disponible en libre-service — contactez un administrateur si une information doit être corrigée.
        </p>
        <div className="flex flex-col gap-4 rounded-[18px] border border-gray-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-1">
            <span className="text-[12.5px] font-semibold text-gray-500">Nom</span>
            <span className="text-[14.5px] text-culture-ink">{getFullName(user)}</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
            <span className="text-[12.5px] font-semibold text-gray-500">Email</span>
            <span className="text-[14.5px] text-culture-ink">{user.email}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Session
        </h2>
        <p className="mb-4 text-[13px] text-gray-500">
          Vous restez connecté sur cet appareil jusqu'à ce que vous vous
          déconnectiez manuellement.
        </p>
        <div className="flex items-center justify-between rounded-[18px] border border-gray-200 bg-white p-6 sm:p-8">
          <span className="text-[13.5px] text-gray-500">
            Se déconnecter de Culture+ Bénin sur cet appareil.
          </span>
          <button
            type="button"
            onClick={logout}
            className="whitespace-nowrap rounded-full border border-gray-300 px-5 py-2.5 text-[13px] font-semibold text-gray-500 transition-colors duration-200 hover:border-culture-terracotta hover:text-culture-terracotta"
          >
            Se déconnecter
          </button>
        </div>
      </section>
    </div>
  );
}
