"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Film, Sparkles } from "lucide-react";
import type { Artwork } from "@/lib/types";

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  className?: string;
  imageContainerClass?: string;
  showCategoryBadge?: boolean;
  indexLabel?: string;
  description?: string;
  actionHint?: string;
}

export function ArtworkCard({
  artwork,
  onSelect,
  className = "",
  imageContainerClass = "aspect-[4/5]",
  showCategoryBadge = true,
  indexLabel,
  description,
  actionHint,
}: ArtworkCardProps) {
  const [frameIdx, setFrameIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const hasFrames = Boolean(artwork.frames && artwork.frames.length > 1);

  useEffect(() => {
    if (!hasFrames || !isHovered || !artwork.frames) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % artwork.frames!.length);
    }, 180);

    return () => window.clearInterval(timer);
  }, [hasFrames, isHovered, artwork.frames]);

  const activeSrc =
    hasFrames && artwork.frames
      ? artwork.frames[frameIdx] || artwork.thumbnail
      : artwork.thumbnail;

  return (
    <button
      type="button"
      onClick={() => onSelect(artwork)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setFrameIdx(0);
      }}
      className={`group relative flex flex-col overflow-hidden rounded-[24px] border border-[#1B2945]/10 bg-white text-left shadow-[0_10px_30px_-18px_rgba(27,41,69,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A96850]/45 hover:shadow-[0_18px_38px_-18px_rgba(27,41,69,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2945] ${className}`}
    >
      {/* Image Canvas */}
      <div
        className={`relative w-full overflow-hidden bg-[#F5F3F0] ${imageContainerClass}`}
      >
        <img
          src={activeSrc}
          alt={artwork.title}
          loading="lazy"
          className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.035] ${
            artwork.isPixelArt
              ? "pixelated bg-white object-contain p-3"
              : artwork.frames
              ? "bg-white object-contain p-2"
              : "object-cover object-top"
          }`}
        />

        {/* Subtle gradient scrim for legibility on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B2945]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Top-left floating index or animation badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {indexLabel && (
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#1B2945]/90 px-2 font-mono text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
              {indexLabel}
            </span>
          )}
          {hasFrames && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#A96850] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
              <Film className="h-3 w-3" />
              <span>{artwork.frames!.length}f</span>
            </span>
          )}
        </div>

        {/* Featured sparkle indicator */}
        {artwork.featured && (
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#A96850] shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover:rotate-12"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      {/* Card Footer Metadata */}
      <div
        className={`flex flex-col justify-between gap-2.5 p-4 sm:px-5 sm:py-4 ${
          description ? "shrink-0 sm:p-5" : "flex-1"
        }`}
      >
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-sm leading-snug font-bold text-[#1B2945] transition-colors group-hover:text-[#A96850] sm:text-[15px]">
              {artwork.title}
            </h3>
            <span className="shrink-0 font-mono text-[11px] font-medium text-[#34445F]/70">
              {artwork.year}
            </span>
          </div>

          {description && (
            <p className="text-xs leading-relaxed text-[#34445F] sm:text-[13.5px]">
              {description}
            </p>
          )}
        </div>

        {(showCategoryBadge || actionHint) && (
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {showCategoryBadge ? (
              <span className="inline-flex items-center rounded-full bg-[#F5F3F0] px-2.5 py-0.5 text-[11px] font-semibold text-[#34445F]">
                {artwork.category}
              </span>
            ) : (
              <span />
            )}

            {actionHint && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A96850] transition-transform duration-200 group-hover:translate-x-0.5">
                <span>{actionHint}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
