import type { ReactNode } from "react";

export const formInputClass =
  "rounded-[10px] border border-gray-300 bg-white px-3.5 py-3 text-sm text-culture-ink focus:outline-none focus:ring-2 focus:ring-culture-green";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-[12.5px] font-semibold text-gray-700">
      {label}
      {children}
    </label>
  );
}
