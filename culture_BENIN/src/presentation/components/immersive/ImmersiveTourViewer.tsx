import { useEffect, useRef } from "react";
import { Viewer } from "mapillary-js";
import "mapillary-js/dist/mapillary.css";

interface ImmersiveTourViewerProps {
  imageId: string;
  title: string;
  caption: string;
  onClose: () => void;
}

export function ImmersiveTourViewer({
  imageId,
  title,
  caption,
  onClose,
}: ImmersiveTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const accessToken = import.meta.env.VITE_MAPILLARY_ACCESS_TOKEN;

  useEffect(() => {
    if (!accessToken || !containerRef.current) return;

    const viewer = new Viewer({
      accessToken,
      container: containerRef.current,
      imageId,
      component: { cover: false },
    });

    return () => {
      viewer.remove();
    };
  }, [accessToken, imageId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] bg-[#0d0d0d]">
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />

      {!accessToken && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-[420px] rounded-2xl bg-white/95 p-8 text-center">
            <p className="mb-3 font-display text-xl font-semibold text-culture-ink">
              Visite immersive indisponible
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              Aucun jeton d'accès Mapillary n'est configuré. Ajoutez{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">
                VITE_MAPILLARY_ACCESS_TOKEN
              </code>{" "}
              dans un fichier <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">.env</code>{" "}
              (voir <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px]">.env.example</code>)
              puis relancez le serveur.
            </p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/65 to-transparent p-5">
        <div className="text-white">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/75">
            Visite immersive 360°
          </div>
          <div className="mt-1 font-display text-lg font-medium">{title}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la visite immersive"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
        <p className="text-[12.5px] text-white/80">{caption}</p>
      </div>
    </div>
  );
}
