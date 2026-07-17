import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchResult, SearchResultType } from "@/domain/entities/SearchResult";
import { useDebouncedValue } from "@/presentation/hooks/useDebouncedValue";
import {
  SEARCH_MIN_QUERY_LENGTH,
  useGlobalSearch,
} from "@/presentation/queries";

type SearchResultLabel =
  | "Ville"
  | "Site"
  | "Personnalité"
  | "Récit"
  | "Événement"
  | "Tradition";

const RESULT_TYPE_LABELS: Record<SearchResultType, SearchResultLabel> = {
  city: "Ville",
  touristSite: "Site",
  historicalFigure: "Personnalité",
  story: "Récit",
  event: "Événement",
  tradition: "Tradition",
};

const RESULT_ROUTES: Record<SearchResultType, (id: string) => string> = {
  city: (id) => `/explorer/${id}`,
  touristSite: (id) => `/explorer/sites/${id}`,
  historicalFigure: (id) => `/explorer/personnalites/${id}`,
  story: (id) => `/explorer/recits/${id}`,
  event: (id) => `/explorer/evenements/${id}`,
  tradition: (id) => `/explorer/traditions/${id}`,
};

function SearchResultTypeIcon({ type }: { type: SearchResultLabel }) {
  const paths: Record<SearchResultLabel, string> = {
    Ville: "M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z M9.5 9a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z",
    Site: "M3 10l9-6 9 6M5 10v10M19 10v10M3 20h18M9 20v-6h6v6",
    Personnalité: "M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7z M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5",
    Récit: "M4 5.2C4 4.5 4.6 4 5.3 4H11v16H5.3A1.3 1.3 0 014 18.7V5.2z M20 5.2c0-.7-.6-1.2-1.3-1.2H13v16h5.7c.7 0 1.3-.5 1.3-1.3V5.2z",
    Événement: "M4.5 5.5h15A1.5 1.5 0 0121 7v12a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19V7a1.5 1.5 0 011.5-1.5z M3 10h18 M8 3v4 M16 3v4",
    Tradition: "M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z",
  };

  return (
    <span
      title={type}
      aria-label={type}
      className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#eef4ef] text-culture-green"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d={paths[type]} />
      </svg>
    </span>
  );
}

function SearchGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" />
    </svg>
  );
}

interface GlobalSearchFieldProps {
  className?: string;
  placeholder?: string;
  /** Restreint la recherche à certains types (recherche contextuelle). */
  types?: SearchResultType[];
  /** false = simple champ de filtre : pas de liste déroulante ni d'appel réseau. */
  dropdown?: boolean;
  /** Notifie chaque frappe (utile pour filtrer une grille en direct). */
  onQueryChange?: (query: string) => void;
}

export function GlobalSearchField({
  className = "",
  placeholder = "Rechercher sur la plateforme…",
  types,
  dropdown = true,
  onQueryChange,
}: GlobalSearchFieldProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 250);
  const effectiveQuery = dropdown ? debouncedQuery : "";
  const hasQuery = effectiveQuery.trim().length >= SEARCH_MIN_QUERY_LENGTH;
  const { data, isFetching } = useGlobalSearch(effectiveQuery, 8, types);
  const results = hasQuery ? (data ?? []) : [];

  const handleChange = (value: string) => {
    setQuery(value);
    onQueryChange?.(value);
    if (dropdown) setIsOpen(true);
  };

  const goToResult = (result: SearchResult) => {
    navigate(RESULT_ROUTES[result.type](result.id));
    setQuery("");
    onQueryChange?.("");
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <SearchGlyph />
      <input
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => dropdown && setIsOpen(true)}
        onKeyDown={(event) => {
          if (dropdown && event.key === "Enter" && results[0]) goToResult(results[0]);
          if (event.key === "Escape") setIsOpen(false);
        }}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-9 pr-4 text-[13px] text-culture-ink focus:outline-none focus:ring-2 focus:ring-culture-green"
      />

      {dropdown && isOpen && hasQuery && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-[calc(100%+8px)] z-50 max-h-[70vh] w-[400px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-2xl border border-gray-200 bg-white py-1.5 shadow-[0_16px_36px_rgba(32,33,36,0.16)]">
            {results.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                type="button"
                onClick={() => goToResult(result)}
                className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-50"
              >
                <SearchResultTypeIcon type={RESULT_TYPE_LABELS[result.type]} />
                <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <span className="flex w-full items-baseline justify-between gap-2">
                    <span className="text-[13.5px] font-semibold leading-snug text-culture-ink">
                      {result.title}
                    </span>
                    <span className="flex-none text-[10.5px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                      {RESULT_TYPE_LABELS[result.type]}
                    </span>
                  </span>
                  <span className="line-clamp-2 w-full text-left text-[12px] leading-snug text-gray-500">
                    {result.description || result.category}
                  </span>
                </span>
              </button>
            ))}
            {results.length === 0 && (
              <p className="px-4 py-2.5 text-[12.5px] text-gray-500">
                {isFetching
                  ? "Recherche…"
                  : `Aucun résultat pour « ${effectiveQuery.trim()} »`}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
