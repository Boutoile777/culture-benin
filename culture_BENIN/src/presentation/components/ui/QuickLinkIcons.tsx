import type { QuickLinkIcon } from "@/shared/constants/homeStaticContent";

const sharedProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Compass() {
  return (
    <svg {...sharedProps} className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <polygon points="15,9 13,13 9,15 11,11" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MapPin() {
  return (
    <svg {...sharedProps} className="h-6 w-6">
      <path d="M12 21s7-7.58 7-12a7 7 0 10-14 0c0 4.42 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  );
}

function BookOpen() {
  return (
    <svg {...sharedProps} className="h-6 w-6">
      <path d="M4 5.5c2.5-1 5-1 8 0v13c-3-1-5.5-1-8 0v-13z" />
      <path d="M20 5.5c-2.5-1-5-1-8 0v13c3-1 5.5-1 8 0v-13z" />
    </svg>
  );
}

function UploadCloud() {
  return (
    <svg {...sharedProps} className="h-6 w-6">
      <path d="M7 18a4.5 4.5 0 01-.6-8.96A5.5 5.5 0 0117.3 8.5 4 4 0 0117 18H7z" />
      <path d="M12 12v6M9.5 14.5L12 12l2.5 2.5" />
    </svg>
  );
}

const ICONS: Record<QuickLinkIcon, () => React.JSX.Element> = {
  compass: Compass,
  mapPin: MapPin,
  bookOpen: BookOpen,
  uploadCloud: UploadCloud,
};

export function QuickLinkIconGlyph({ icon }: { icon: QuickLinkIcon }) {
  const Icon = ICONS[icon];
  return <Icon />;
}
