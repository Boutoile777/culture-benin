import { useState } from "react";
import type { Testimony } from "@/domain/entities/Testimony";
import { AudioTestimonyDialog } from "@/presentation/components/testimony/AudioTestimonyDialog";
import { VideoTestimonyDialog } from "@/presentation/components/testimony/VideoTestimonyDialog";

interface TestimonySectionProps {
  testimonies: Testimony[];
  title?: string;
}

export function TestimonySection({ testimonies, title = "Témoignages" }: TestimonySectionProps) {
  const [activeTestimony, setActiveTestimony] = useState<Testimony | null>(null);

  if (testimonies.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-8">
      <h2 className="mb-4 font-display text-[20px] font-medium text-culture-ink">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {testimonies.map((testimony) => (
          <button
            key={testimony.id}
            type="button"
            onClick={() => setActiveTestimony(testimony)}
            className="group flex items-center gap-3.5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(32,33,36,0.1)]"
          >
            <span className="relative h-14 w-14 flex-none overflow-hidden rounded-xl">
              <img
                src={testimony.image}
                alt={testimony.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white transition-colors group-hover:bg-black/40">
                {testimony.type === "audio" ? "♪" : "▶"}
              </span>
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-culture-terracotta">
                {testimony.type === "audio" ? "Audio" : "Vidéo"}
                {testimony.duration ? ` · ${testimony.duration}` : ""}
              </span>
              <span className="truncate text-[13.5px] font-semibold text-culture-ink">
                {testimony.title}
              </span>
              <span className="truncate text-[12px] text-gray-500">{testimony.speaker}</span>
            </span>
          </button>
        ))}
      </div>

      {activeTestimony?.type === "audio" && (
        <AudioTestimonyDialog
          testimony={activeTestimony}
          onClose={() => setActiveTestimony(null)}
        />
      )}
      {activeTestimony?.type === "video" && (
        <VideoTestimonyDialog
          testimony={activeTestimony}
          onClose={() => setActiveTestimony(null)}
        />
      )}
    </div>
  );
}
