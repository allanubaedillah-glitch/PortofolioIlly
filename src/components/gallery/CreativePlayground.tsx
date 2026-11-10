"use client";

import { useMemo, useState } from "react";
import {
  Brush,
  FlaskConical,
  Grid2X2,
  Layers,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Reveal } from "@/components/ui/Reveal";
import { PLAYGROUND_CATEGORIES } from "@/lib/data";
import type { Artwork, ArtworkCategory, Translations } from "@/lib/types";

interface CreativePlaygroundProps {
  t: Translations["playground"];
  artworks: Artwork[];
  onSelect: (artwork: Artwork, filteredList: Artwork[]) => void;
}

type FilterOption = "ALL" | ArtworkCategory;

const CATEGORY_STYLE: Record<
  ArtworkCategory,
  {
    icon: typeof Sparkles;
    accentBg: string;
    accentText: string;
    borderAccent: string;
  }
> = {
  "OC Universe": {
    icon: Layers,
    accentBg: "bg-[#1B2945]",
    accentText: "text-white",
    borderAccent: "border-[#1B2945]/20",
  },
  Illustrations: {
    icon: Brush,
    accentBg: "bg-[#34445F]",
    accentText: "text-white",
    borderAccent: "border-[#34445F]/20",
  },
  "Pixel Playground": {
    icon: Grid2X2,
    accentBg: "bg-[#A96850]",
    accentText: "text-white",
    borderAccent: "border-[#A96850]/25",
  },
  "Random Creations": {
    icon: Shuffle,
    accentBg: "bg-[#D5B5A5]",
    accentText: "text-[#1B2945]",
    borderAccent: "border-[#D5B5A5]",
  },
  Experiments: {
    icon: FlaskConical,
    accentBg: "bg-[#1B2945]/90",
    accentText: "text-[#D5B5A5]",
    borderAccent: "border-[#1B2945]/20",
  },
};

function getAspectClass(aspect?: Artwork["aspect"]): string {
  switch (aspect) {
    case "portrait":
      return "aspect-[3/4]";
    case "landscape":
      return "aspect-[4/3]";
    default:
      return "aspect-square";
  }
}

export function CreativePlayground({
  t,
  artworks,
  onSelect,
}: CreativePlaygroundProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>("ALL");

  const filteredArtworks = useMemo(() => {
    if (selectedCategory === "ALL") return artworks;
    return artworks.filter((item) => item.category === selectedCategory);
  }, [artworks, selectedCategory]);

  const activeCategoryMeta =
    selectedCategory !== "ALL" ? t.categories[selectedCategory] : null;
  const activeStyle =
    selectedCategory !== "ALL" ? CATEGORY_STYLE[selectedCategory] : null;

  return (
    <section
      id="playground"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
    >
      <Reveal>
        <div className="rounded-[28px] border border-[#1B2945]/10 bg-white/75 p-5 shadow-[0_18px_45px_-28px_rgba(27,41,69,0.28)] backdrop-blur-xs sm:rounded-[34px] sm:p-8 lg:p-10">
          {/* Header */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-[#A96850] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                {t.eyebrow}
              </span>
              <h2 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-[#1B2945] sm:text-3xl lg:text-[2.15rem]">
                {t.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#34445F] sm:text-base">
                {t.subtitle}
              </p>
            </div>

            <div className="shrink-0 self-start rounded-full border border-[#1B2945]/12 bg-[#F5F3F0] px-4 py-1.5 font-mono text-xs font-bold text-[#1B2945] md:self-auto">
              {filteredArtworks.length} {t.countSuffix}
            </div>
          </div>

          {/* Category Filter Pills (horizontally scrollable on narrow mobile, wrapping cleanly on desktop) */}
          <div
            role="tablist"
            aria-label={t.title}
            className="mt-6 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "ALL"}
              onClick={() => setSelectedCategory("ALL")}
              className={`inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                selectedCategory === "ALL"
                  ? "border-[#1B2945] bg-[#1B2945] text-white shadow-xs"
                  : "border-[#1B2945]/12 bg-[#F5F3F0] text-[#34445F] hover:border-[#1B2945]/35 hover:text-[#1B2945]"
              }`}
            >
              <span>{t.allLabel}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                  selectedCategory === "ALL"
                    ? "bg-white/20 text-white"
                    : "bg-white text-[#34445F]"
                }`}
              >
                {artworks.length}
              </span>
            </button>

            {PLAYGROUND_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const style = CATEGORY_STYLE[category];
              const Icon = style.icon;
              const count = artworks.filter(
                (item) => item.category === category
              ).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                    isSelected
                      ? `border-transparent ${style.accentBg} ${style.accentText} shadow-xs`
                      : "border-[#1B2945]/12 bg-[#F5F3F0] text-[#34445F] hover:border-[#1B2945]/35 hover:text-[#1B2945]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{t.categories[category].label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                      isSelected
                        ? "bg-white/20 text-current"
                        : "bg-white text-[#34445F]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Identity Strip */}
          {activeCategoryMeta && activeStyle && (
            <div
              className={`mt-5 flex items-center gap-3 rounded-2xl border bg-[#F5F3F0]/80 px-4 py-3 ${activeStyle.borderAccent}`}
            >
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${activeStyle.accentBg} ${activeStyle.accentText}`}
              >
                {(() => {
                  const ActiveIcon = activeStyle.icon;
                  return <ActiveIcon className="h-4 w-4" />;
                })()}
              </span>
              <div>
                <p className="font-display text-sm font-bold text-[#1B2945]">
                  {activeCategoryMeta.label}
                </p>
                <p className="text-xs text-[#34445F]">
                  {activeCategoryMeta.tagline}
                </p>
              </div>
            </div>
          )}

          {/* Playground Grid */}
          {filteredArtworks.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-[#1B2945]/20 bg-[#F5F3F0] p-10 text-center text-sm text-[#34445F]">
              {t.emptyCategory}
            </div>
          ) : (
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onSelect={(item) => onSelect(item, filteredArtworks)}
                  imageContainerClass={getAspectClass(artwork.aspect)}
                />
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
