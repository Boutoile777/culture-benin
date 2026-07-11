import { useState } from "react";
import { Link } from "react-router-dom";
import type { Story } from "@/domain/entities/Story";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [imageErrored, setImageErrored] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]">
      <div className="overflow-hidden">
        {imageErrored ? (
          <div className="flex h-[150px] items-center justify-center bg-gradient-to-br from-gray-100 to-[#e6e3da] text-xs text-gray-400">
            photo à venir — {story.title}
          </div>
        ) : (
          <img
            src={story.image}
            alt={story.title}
            onError={() => setImageErrored(true)}
            className="h-[150px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <div className="flex h-[200px] flex-col gap-2 p-[18px]">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
          {story.category}
        </span>
        <span className="line-clamp-2 font-display text-[19px] font-medium leading-tight text-culture-ink">
          {story.title}
        </span>
        <span className="line-clamp-3 text-[13px] leading-relaxed text-gray-500">
          {story.excerpt}
        </span>
        <Link
          to={`/explorer/recits/${story.id}`}
          className="mt-auto self-start text-[12.5px] font-semibold text-culture-green transition-colors hover:text-culture-terracotta"
        >
          Voir plus →
        </Link>
      </div>
    </div>
  );
}
