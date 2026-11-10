"use client";

import { ArrowRight } from "lucide-react";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Artwork, Translations } from "@/lib/types";

interface SelectedCreationsProps {
  t: Translations["featured"];
  artworks: Artwork[];
  onSelect: (artwork: Artwork) => void;
}

export function SelectedCreations({
  t,
  artworks,
  onSelect,
}: SelectedCreationsProps) {
  const displayItems = artworks.slice(0, 6);

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-[#A96850] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A96850]" />
              {t.eyebrow}
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-[#1B2945] sm:text-3xl lg:text-[2.15rem]">
              {t.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#34445F] sm:text-base">
              {t.subtitle}
            </p>
          </div>

          <a
            href="#playground"
            className="group hidden min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-[#1B2945]/15 bg-white px-5 py-2.5 text-sm font-bold text-[#1B2945] shadow-2xs transition-all hover:border-[#1B2945] hover:bg-[#1B2945] hover:text-white sm:inline-flex"
          >
            <span>{t.cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>

      {displayItems.length === 0 ? (
        <div className="mt-8 rounded-[24px] border border-dashed border-[#1B2945]/20 bg-white/70 p-10 text-center text-sm text-[#34445F]">
          {t.empty}
        </div>
      ) : (
        /* Asymmetrical Editorial Bento Grid (varied sizes & proportions inspired by Reference 1) */
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {/* Column 1 (5 cols): Large Primary Featured Portrait */}
          {displayItems[0] && (
            <Reveal className="md:col-span-5" delayMs={40}>
              <ArtworkCard
                artwork={displayItems[0]}
                onSelect={onSelect}
                indexLabel="01"
                className="h-full"
                imageContainerClass="aspect-[4/5] md:aspect-[3/4] lg:min-h-[390px]"
              />
            </Reveal>
          )}

          {/* Column 2 & 3 (7 cols): Asymmetrical Bento Cluster */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-7 md:gap-6">
            {/* Paired Portrait Artwork Cards (echoing Reference 1's dual vertical cards) */}
            {displayItems[1] && (
              <Reveal delayMs={90}>
                <ArtworkCard
                  artwork={displayItems[1]}
                  onSelect={onSelect}
                  indexLabel="02"
                  className="h-full"
                  imageContainerClass="aspect-[3/4]"
                />
              </Reveal>
            )}

            {displayItems[2] && (
              <Reveal delayMs={140}>
                <ArtworkCard
                  artwork={displayItems[2]}
                  onSelect={onSelect}
                  indexLabel="03"
                  className="h-full"
                  imageContainerClass="aspect-[3/4]"
                />
              </Reveal>
            )}

            {/* Supporting Wide Landscape Card spanning 2 cols */}
            {displayItems[4] && (
              <Reveal className="sm:col-span-2" delayMs={180}>
                <ArtworkCard
                  artwork={displayItems[4]}
                  onSelect={onSelect}
                  indexLabel="04"
                  imageContainerClass="aspect-[16/9]"
                />
              </Reveal>
            )}
          </div>

          {/* Lower Asymmetric Row: Square Pixel Card + Motion Experiment Card */}
          {displayItems[3] && (
            <Reveal className="md:col-span-5" delayMs={210}>
              <ArtworkCard
                artwork={displayItems[3]}
                onSelect={onSelect}
                indexLabel="05"
                className="h-full"
                imageContainerClass="aspect-square md:aspect-[4/3]"
              />
            </Reveal>
          )}

          {displayItems[5] && (
            <Reveal className="md:col-span-7" delayMs={250}>
              <ArtworkCard
                artwork={displayItems[5]}
                onSelect={onSelect}
                indexLabel="06"
                className="h-full"
                imageContainerClass="aspect-[16/10] md:aspect-[16/9]"
              />
            </Reveal>
          )}
        </div>
      )}

      {/* Prominent Rounded CTA Button (echoing Reference 1's "View More" pill below artwork cards) */}
      <div className="mt-8 flex justify-center sm:hidden">
        <a
          href="#playground"
          className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[#1B2945]/15 bg-white px-6 py-3 text-sm font-bold text-[#1B2945] shadow-xs transition-colors hover:bg-[#1B2945] hover:text-white"
        >
          <span>{t.cta}</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
