import { lazy, Suspense, useState } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { wikimediaImage } from "@/shared/utils/wikimedia";

const ImmersiveTourViewer = lazy(() =>
  import("@/presentation/components/immersive/ImmersiveTourViewer").then((m) => ({
    default: m.ImmersiveTourViewer,
  })),
);

const DEMO_TOUR = {
  imageId: "888939035048535",
  title: "Porte du Non-Retour — Ouidah",
  caption: "Photographie sphérique 360° · Mapillary, CC BY-SA · anebophil, 2018",
};

export function ImmersiveTestPage() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <MainLayout>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          Page de test
        </div>
        <h1 className="mb-4 font-display text-3xl font-semibold text-culture-ink">
          Visite immersive 360°
        </h1>
        <p className="mb-8 leading-relaxed text-gray-600">
          Preuve de concept : une vraie photographie sphérique 360° de la
          Porte du Non-Retour à Ouidah, trouvée sur Mapillary et affichée ici
          avec la librairie MapillaryJS.
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-gray-200">
          <img
            src={wikimediaImage("Door of no return.jpg", 1200)}
            alt="Porte du Non-Retour"
            className="h-72 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => setTourOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/40"
          >
            <span className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-culture-ink">
              ▶ Lancer la visite immersive
            </span>
          </button>
        </div>

        <p className="mt-4 text-[12.5px] text-gray-500">
          Nécessite un jeton d'accès Mapillary (
          <code className="rounded bg-gray-100 px-1.5 py-0.5">
            VITE_MAPILLARY_ACCESS_TOKEN
          </code>
          ) — voir <code className="rounded bg-gray-100 px-1.5 py-0.5">.env.example</code>.
        </p>
      </main>

      {tourOpen && (
        <Suspense fallback={null}>
          <ImmersiveTourViewer
            imageId={DEMO_TOUR.imageId}
            title={DEMO_TOUR.title}
            caption={DEMO_TOUR.caption}
            onClose={() => setTourOpen(false)}
          />
        </Suspense>
      )}
    </MainLayout>
  );
}
