import { useState, type FormEvent, type MouseEvent } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { BrandLogo } from "@/presentation/components/common/BrandLogo";
import { FormField, formInputClass } from "@/presentation/components/ui/FormField";
import { GoogleIcon, FacebookIcon } from "@/presentation/components/auth/SocialIcons";

type DialogView = "login" | "forgotPassword";

export function LoginDialog() {
  const { login, closeAuthDialog, openSignup } = useAuth();
  const [view, setView] = useState<DialogView>("login");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !password.trim()) {
      setError("Merci de renseigner votre nom et votre mot de passe.");
      return;
    }
    setError(null);
    login(name);
  };

  const handleSocialLogin = (provider: "Google" | "Facebook") => {
    login(`Compte ${provider}`, `contact@${provider.toLowerCase()}.com`);
  };

  const handleResetSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(resetEmail.trim())) {
      setResetError("Merci de renseigner une adresse email valide.");
      return;
    }
    setResetError(null);
    setResetSent(true);
  };

  const backToLogin = () => {
    setView("login");
    setResetSent(false);
    setResetError(null);
    setResetEmail("");
  };

  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm sm:p-6"
      onClick={closeAuthDialog}
    >
      <div
        onClick={stopPropagation}
        className="relative max-h-[90vh] w-full max-w-[400px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-10"
      >
        <button
          type="button"
          onClick={closeAuthDialog}
          aria-label="Fermer"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-culture-ink transition-colors hover:bg-gray-100"
        >
          ✕
        </button>

        <BrandLogo />

        {view === "login" ? (
          <>
            <p className="mt-5 text-[14px] leading-relaxed text-gray-500">
              Connectez-vous pour contribuer, jouer et sauvegarder vos
              découvertes. L'exploration reste libre sans compte.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-3 rounded-full border border-gray-300 py-2.5 text-[13.5px] font-semibold text-culture-ink transition-colors duration-200 hover:bg-gray-50"
              >
                <GoogleIcon />
                Continuer avec Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center gap-3 rounded-full border border-gray-300 py-2.5 text-[13.5px] font-semibold text-culture-ink transition-colors duration-200 hover:bg-gray-50"
              >
                <FacebookIcon />
                Continuer avec Facebook
              </button>
            </div>

            <div className="my-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.1em] text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              ou
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <FormField label="Votre nom">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ex. Aïcha Dossou"
                  className={formInputClass}
                  autoFocus
                />
              </FormField>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[12.5px] font-semibold text-gray-700">
                  Mot de passe
                  <button
                    type="button"
                    onClick={() => setView("forgotPassword")}
                    className="font-semibold text-culture-terracotta hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className={formInputClass}
                />
              </div>

              {error && <p className="text-[13px] text-culture-terracotta">{error}</p>}

              <button
                type="submit"
                className="mt-2 rounded-full bg-culture-green py-3 text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                Se connecter
              </button>
            </form>

            <div className="mt-6 text-center text-[12.5px] text-gray-500">
              Pas encore de compte ?{" "}
              <button
                type="button"
                onClick={openSignup}
                className="font-semibold text-culture-terracotta hover:underline"
              >
                Créer un compte
              </button>
            </div>
          </>
        ) : resetSent ? (
          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-culture-green text-xl text-white">
              ✓
            </span>
            <p className="text-[14px] leading-relaxed text-gray-500">
              Si un compte existe pour <strong>{resetEmail}</strong>, un lien
              de réinitialisation vient de lui être envoyé.
            </p>
            <button
              type="button"
              onClick={backToLogin}
              className="mt-2 rounded-full border border-gray-300 px-6 py-2.5 text-[13.5px] font-semibold text-culture-green transition-colors duration-200 hover:bg-gray-50"
            >
              Retour à la connexion
            </button>
          </div>
        ) : (
          <>
            <p className="mt-5 text-[14px] leading-relaxed text-gray-500">
              Renseignez votre email : nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </p>

            <form onSubmit={handleResetSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <FormField label="Email">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(event) => setResetEmail(event.target.value)}
                  placeholder="Ex. aicha.dossou@email.com"
                  className={formInputClass}
                  autoFocus
                />
              </FormField>

              {resetError && <p className="text-[13px] text-culture-terracotta">{resetError}</p>}

              <button
                type="submit"
                className="mt-2 rounded-full bg-culture-green py-3 text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                Envoyer le lien de réinitialisation
              </button>
            </form>

            <div className="mt-6 text-center text-[12.5px] text-gray-500">
              <button
                type="button"
                onClick={backToLogin}
                className="font-semibold text-culture-terracotta hover:underline"
              >
                ← Retour à la connexion
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
