import { useState, type FormEvent } from "react";
import { FormField, formInputClass } from "@/presentation/components/ui/FormField";
import { useAuth } from "@/presentation/contexts/AuthContext";

export function SettingsPage() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateProfile(name, email);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Informations personnelles
        </h2>
        <p className="mb-4 text-[13px] text-gray-500">
          Ces informations sont utilisées pour identifier vos contributions
          et vous contacter en cas de suivi de modération.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-[18px] border border-gray-200 bg-white p-6 sm:p-8"
        >
          <FormField label="Nom">
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSaved(false);
              }}
              className={formInputClass}
            />
          </FormField>
          <FormField label="Email">
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSaved(false);
              }}
              placeholder="Ex. aicha.dossou@email.com"
              className={formInputClass}
            />
          </FormField>

          {saved && (
            <p className="text-[13px] font-semibold text-culture-green">
              Profil mis à jour.
            </p>
          )}

          <button
            type="submit"
            className="self-start rounded-full bg-culture-green px-6 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
          >
            Enregistrer
          </button>
        </form>
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
