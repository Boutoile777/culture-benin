import { Link } from "react-router-dom";

interface BackLinkProps {
  to: string;
  label: string;
  className?: string;
}

export function BackLink({ to, label, className = "" }: BackLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-block text-[12.5px] font-semibold text-gray-500 hover:text-culture-green ${className}`}
    >
      ← {label}
    </Link>
  );
}
