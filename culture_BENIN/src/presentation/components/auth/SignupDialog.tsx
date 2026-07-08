import { useState, type FormEvent, type MouseEvent } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { BrandLogo } from "@/presentation/components/common/BrandLogo";
import { FormField, formInputClass } from "@/presentation/components/ui/FormField";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export function SignupDialog() {
  const { login, closeAuthDialog, openLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Merci de remplir tous les champs.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Merci de renseigner une adresse email valide.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setError(null);
    login(name, email);
  };

  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm sm:p-6"
      onClick={closeAuthDialog}
    >
      <div
        onClick={stopPropagation}
        className="relative grid max-h-[92vh] w-full max-w-[860px] grid-cols-1 overflow-y-auto rounded-[20px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:grid-cols-2 lg:overflow-hidden"
      >
        <button
          type="button"
          onClick={closeAuthDialog}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-culture-ink transition-colors hover:bg-white"
        >
          ✕
        </button>

        <div className="flex flex-col p-6 sm:p-10">
          <BrandLogo />

          <h1 className="mt-5 font-display text-2xl font-semibold text-culture-ink">
            Créer un compte
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
            Rejoignez la communauté pour contribuer, jouer et sauvegarder vos
            découvertes. L'exploration reste libre sans compte.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
            <FormField label="Votre nom">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex. Aïcha Dossou"
                className={formInputClass}
                autoFocus
              />
            </FormField>
            <FormField label="Email">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Ex. aicha.dossou@email.com"
                className={formInputClass}
              />
            </FormField>
            <FormField label="Mot de passe">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className={formInputClass}
              />
            </FormField>
            <FormField label="Confirmer le mot de passe">
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                className={formInputClass}
              />
            </FormField>

            {error && <p className="text-[13px] text-culture-terracotta">{error}</p>}

            <button
              type="submit"
              className="mt-2 rounded-full bg-culture-green py-3 text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
            >
              Créer mon compte
            </button>
          </form>

          <div className="mt-6 text-center text-[12.5px] text-gray-500">
            Déjà un compte ?{" "}
            <button
              type="button"
              onClick={openLogin}
              className="font-semibold text-culture-terracotta hover:underline"
            >
              Se connecter
            </button>
          </div>
        </div>

        <div className="relative order-first h-40 sm:h-56 lg:order-none lg:h-auto">
          <img
            src={wikimediaImage("Place Bio Guerra de Cotonou 01.jpg", 1200)}
            alt="Monument Bio Guerra, Cotonou"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="font-display text-[20px] font-medium leading-snug text-white">
              Rejoignez une communauté qui fait vivre le patrimoine béninois.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
