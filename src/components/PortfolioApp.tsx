"use client";

import { useState } from "react";
import { AboutSection } from "@/components/about/AboutSection";
import { ArtworkLightbox } from "@/components/artwork/ArtworkLightbox";
import { ContactSection } from "@/components/contact/ContactSection";
import { CreativePlayground } from "@/components/gallery/CreativePlayground";
import { SelectedCreations } from "@/components/gallery/SelectedCreations";
import { HeroSection } from "@/components/hero/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { Navbar } from "@/components/navigation/Navbar";
import {
  artworks,
  featuredArtworks,
  profile,
  socials,
  translations,
} from "@/lib/data";
import type { Artwork, Language } from "@/lib/types";

export function PortfolioApp() {
  const [lang, setLang] = useState<Language>("en");
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);
  const [lightboxList, setLightboxList] = useState<Artwork[]>(artworks);

  const t = translations[lang];

  const handleOpenFeatured = (artwork: Artwork) => {
    setLightboxList(featuredArtworks);
    setActiveArtwork(artwork);
  };

  const handleOpenPlayground = (artwork: Artwork, filtered: Artwork[]) => {
    setLightboxList(filtered);
    setActiveArtwork(artwork);
  };

  return (
    <div className="relative min-h-screen">
      <PageBackdrop />

      <Navbar
        t={t.nav}
        lang={lang}
        onChangeLang={setLang}
        socials={socials}
      />

      <main>
        <HeroSection t={t.hero} profile={profile} />

        <SelectedCreations
          t={t.featured}
          artworks={featuredArtworks}
          lang={lang}
          onSelect={handleOpenFeatured}
        />

        <CreativePlayground
          t={t.playground}
          artworks={artworks}
          onSelect={handleOpenPlayground}
        />

        <AboutSection t={t.about} profile={profile} lang={lang} />

        <ContactSection t={t.contact} socials={socials} />
      </main>

      <Footer t={t.footer} />

      <ArtworkLightbox
        artwork={activeArtwork}
        list={lightboxList}
        lang={lang}
        t={t.lightbox}
        onClose={() => setActiveArtwork(null)}
        onSelect={(next) => setActiveArtwork(next)}
      />
    </div>
  );
}
