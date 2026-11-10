"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Wrench,
  X,
} from "lucide-react";
import { getArtworkDescription } from "@/lib/data";
import type { Artwork, Language, Translations } from "@/lib/types";

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  list: Artwork[];
  lang: Language;
  t: Translations["lightbox"];
  onClose: () => void;
  onSelect: (artwork: Artwork) => void;
}

export function ArtworkLightbox({
  artwork,
  list,
  lang,
  t,
  onClose,
  onSelect,
}: ArtworkLightboxProps) {
  const [frameIdx, setFrameIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentIndex = artwork
    ? list.findIndex((item) => item.id === artwork.id)
    : -1;

  const hasPrev = list.length > 1 && currentIndex !== -1;
  const hasNext = list.length > 1 && currentIndex !== -1;

  const goPrev = useCallback(() => {
    if (!hasPrev) return;
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    onSelect(list[prevIndex]);
  }, [hasPrev, currentIndex, list, onSelect]);

  const goNext = useCallback(() => {
    if (!hasNext) return;
    const nextIndex = (currentIndex + 1) % list.length;
    onSelect(list[nextIndex]);
  }, [hasNext, currentIndex, list, onSelect]);

  // Reset frame playback when changing artwork
  useEffect(() => {
    setFrameIdx(0);
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsPlaying(!prefersReduced);
  }, [artwork?.id]);

  // Animate frame-by-frame pieces
  useEffect(() => {
    if (!artwork?.frames || artwork.frames.length <= 1 || !isPlaying) return;
    const timer = window.setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % artwork.frames!.length);
    }, 180);
    return () => window.clearInterval(timer);
  }, [artwork, isPlaying]);

  // Keyboard navigation & scroll lock
  useEffect(() => {
    if (!artwork) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [artwork, onClose, goPrev, goNext]);

  if (!artwork) return null;

  const description = getArtworkDescription(artwork, lang);
  const hasFrames = Boolean(artwork.frames && artwork.frames.length > 1);
  const hasRichDetails = Boolean(
    description || artwork.tools.length > 0 || hasFrames
  );
  const displaySrc =
    hasFrames && artwork.frames ? artwork.frames[frameIdx] : artwork.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B2945]/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-[28px] border border-[#1B2945]/15 bg-[#F5F3F0] shadow-2xl ${
          hasRichDetails ? "max-w-5xl lg:grid lg:grid-cols-12" : "max-w-3xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-3.5 right-3.5 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1B2945]/15 bg-white/95 text-[#1B2945] shadow-sm transition-colors hover:bg-[#1B2945] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2945]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Viewer Panel */}
        <div
          className={`relative flex min-h-[280px] flex-1 items-center justify-center bg-white p-4 sm:p-7 ${
            hasRichDetails ? "lg:col-span-7 lg:min-h-[480px]" : "min-h-[340px]"
          }`}
        >
          <img
            src={displaySrc}
            alt={artwork.title}
            className={`max-h-[62vh] w-auto max-w-full rounded-xl object-contain lg:max-h-[78vh] ${
              artwork.isPixelArt ? "pixelated" : ""
            }`}
          />

          {/* Prev / Next Navigation Buttons */}
          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              aria-label={t.previous}
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1B2945]/15 bg-white/90 text-[#1B2945] shadow-md transition-all hover:bg-[#1B2945] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2945]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={goNext}
              aria-label={t.next}
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1B2945]/15 bg-white/90 text-[#1B2945] shadow-md transition-all hover:bg-[#1B2945] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2945]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Metadata / Editorial Details Panel */}
        {hasRichDetails ? (
          <div className="flex flex-col justify-between gap-5 overflow-y-auto border-t border-[#1B2945]/10 bg-[#F5F3F0] p-5 sm:p-7 lg:col-span-5 lg:border-t-0 lg:border-l">
            <div className="space-y-4 pr-8 lg:pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#1B2945] px-3 py-1 text-xs font-bold text-white">
                  {artwork.category}
                </span>
                <span className="rounded-full bg-[#D5B5A5]/45 px-3 py-1 font-mono text-xs font-semibold text-[#1B2945]">
                  {artwork.year}
                </span>
              </div>

              <h3 className="font-display text-xl font-extrabold text-[#1B2945] sm:text-2xl">
                {artwork.title}
              </h3>

              {description && (
                <p className="text-sm leading-relaxed text-[#34445F]">
                  {description}
                </p>
              )}

              {/* Frame-by-frame controls if applicable */}
              {hasFrames && artwork.frames && (
                <div className="rounded-2xl border border-[#1B2945]/12 bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-wide text-[#1B2945] uppercase">
                      {t.framesTitle}
                    </span>
                    <span className="font-mono text-xs text-[#34445F]">
                      {t.frameLabel} {frameIdx + 1} / {artwork.frames.length}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#1B2945] px-4 text-xs font-bold text-white transition-colors hover:bg-[#34445F]"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>{t.pause}</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>{t.play}</span>
                        </>
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={artwork.frames.length - 1}
                      value={frameIdx}
                      onChange={(e) => {
                        setIsPlaying(false);
                        setFrameIdx(Number(e.target.value));
                      }}
                      aria-label={t.frameLabel}
                      className="h-1.5 flex-1 accent-[#A96850]"
                    />
                  </div>
                </div>
              )}

              {/* Tools Used */}
              <div className="border-t border-[#1B2945]/10 pt-4">
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#34445F] uppercase">
                  <Wrench className="h-3.5 w-3.5 text-[#A96850]" />
                  <span>{t.tools}</span>
                </div>
                {artwork.tools.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {artwork.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#1B2945]/12 bg-white px-3 py-1 text-xs font-medium text-[#1B2945]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1.5 text-xs text-[#34445F]/75 italic">
                    {t.toolsUnlisted}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom counter & quick prev/next bar */}
            <div className="flex items-center justify-between border-t border-[#1B2945]/10 pt-3 text-xs text-[#34445F]">
              <span className="font-mono">
                {currentIndex + 1} / {list.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-full border border-[#1B2945]/15 bg-white px-3 font-semibold text-[#1B2945] hover:border-[#1B2945]"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-full border border-[#1B2945]/15 bg-white px-3 font-semibold text-[#1B2945] hover:border-[#1B2945]"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Simple image-focused footer bar for minimal pieces */
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1B2945]/10 bg-[#F5F3F0] px-5 py-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-display text-base font-bold text-[#1B2945] sm:text-lg">
                {artwork.title}
              </h3>
              <span className="rounded-full bg-[#1B2945] px-2.5 py-0.5 text-[11px] font-bold text-white">
                {artwork.category}
              </span>
              <span className="font-mono text-xs text-[#34445F]">
                {artwork.year}
              </span>
            </div>
            <span className="font-mono text-xs text-[#34445F]">
              {currentIndex + 1} / {list.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
