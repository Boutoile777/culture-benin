import { useState, type ChangeEvent } from "react";
import { formInputClass } from "@/presentation/components/ui/FormField";

const sharedIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function EyeIcon() {
  return (
    <svg {...sharedIconProps} className="h-[18px] w-[18px]">
      <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg {...sharedIconProps} className="h-[18px] w-[18px]">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A9.6 9.6 0 0112 5c6 0 9.5 7 9.5 7a15.6 15.6 0 01-3.3 4.2M6.6 6.7C3.8 8.6 2.5 12 2.5 12s3.5 7 9.5 7a9.4 9.4 0 004.2-1" />
      <path d="M9.9 10.1a3 3 0 004 4" />
    </svg>
  );
}

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function PasswordInput({ value, onChange, placeholder, autoFocus }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`${formInputClass} w-full pr-10`}
      />
      <button
        type="button"
        onClick={() => setIsVisible((current) => !current)}
        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-culture-ink"
      >
        {isVisible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
