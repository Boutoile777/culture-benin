import { useState } from "react";
import type { Story } from "@/domain/entities/Story";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]">
      <div className="overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="h-[150px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-2 p-[18px]">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
          {story.category}
        </span>
        <span className="font-display text-[19px] font-medium leading-tight text-culture-ink">
          {story.title}
        </span>
        <span className="text-[13px] leading-relaxed text-gray-500">
          {story.excerpt}
        </span>
        {expanded && (
          <p className="mt-1 border-t border-gray-100 pt-2.5 text-[13px] leading-relaxed text-gray-500">
            {story.content}
          </p>
        )}
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-1.5 self-start text-[12.5px] font-semibold text-culture-green transition-colors hover:text-culture-terracotta"
        >
          {expanded ? "Voir moins ↑" : "Voir plus ↓"}
        </button>
      </div>
    </div>
  );
}
