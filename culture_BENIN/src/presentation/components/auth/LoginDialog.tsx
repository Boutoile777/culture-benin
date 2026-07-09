import { useState, type FormEvent, type MouseEvent } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { BrandLogo } from "@/presentation/components/common/BrandLogo";
import { FormField, formInputClass } from "@/presentation/components/ui/FormField";
import { PasswordInput } from "@/presentation/components/ui/PasswordInput";
import { getErrorMessage } from "@/infrastructure/api/httpClient";

export function LoginDialog() {
  const { login, closeAuthDialog, openSignup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Merci de renseigner votre email et votre mot de passe.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
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

        <p className="mt-5 text-[14px] leading-relaxed text-gray-500">
          Connectez-vous pour contribuer, jouer et sauvegarder vos
          découvertes. L'exploration reste libre sans compte.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
          <FormField label="Email">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Ex. aicha.dossou@email.com"
              className={formInputClass}
              autoFocus
            />
          </FormField>
          <FormField label="Mot de passe">
            <PasswordInput value={password} onChange={setPassword} placeholder="••••••••" />
          </FormField>

          {error && <p className="text-[13px] text-culture-terracotta">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-culture-green py-3 text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark disabled:opacity-60"
          >
            {isSubmitting ? "Connexion…" : "Se connecter"}
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
      </div>
    </div>
  );
}
