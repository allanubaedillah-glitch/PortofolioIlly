"use client";

import { useEffect, useState } from "react";
import { Instagram, Menu, X } from "lucide-react";
import type { Language, SocialLink, Translations } from "@/lib/types";

interface NavbarProps {
  t: Translations["nav"];
  lang: Language;
  onChangeLang: (lang: Language) => void;
  socials: SocialLink[];
}

const NAV_IDS = [
  { id: "home", key: "home" },
  { id: "portfolio", key: "portfolio" },
  { id: "playground", key: "playground" },
  { id: "about", key: "about" },
  { id: "contact", key: "contact" },
] as const;

export function Navbar({ t, lang, onChangeLang, socials }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const instagram = socials.find((s) => s.id === "instagram" && s.configured);

  useEffect(() => {
    const sections = NAV_IDS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#1B2945]/10 bg-[#F5F3F0]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Clean brand wordmark */}
        <a
          href="#home"
          onClick={() => handleLinkClick("home")}
          className="group flex flex-col justify-center py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2945]"
        >
          <span className="font-display text-base font-bold tracking-tight text-[#1B2945] transition-colors group-hover:text-[#A96850] sm:text-lg">
            RawonBillish
          </span>
          <span className="text-[10px] font-medium text-[#A96850]">
            Illy&apos;s Universe
          </span>
        </a>

        {/* Center: Clean horizontal navigation with active underline */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-6 md:flex lg:gap-8"
        >
          {NAV_IDS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-1.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[#1B2945]"
                    : "text-[#34445F]/75 hover:text-[#1B2945]"
                }`}
              >
                {t[item.key]}
                <span
                  className={`absolute right-0 -bottom-0.5 left-0 h-[2.5px] rounded-full bg-[#1B2945] transition-transform duration-200 origin-center ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Language switcher (EN / ID) + compact social pill */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {instagram && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${instagram.handle}`}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#1B2945]/15 bg-white text-[#1B2945] transition-colors hover:border-[#A96850] hover:text-[#A96850] sm:inline-flex"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}

          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-full border border-[#1B2945]/15 bg-white p-0.5 shadow-2xs"
          >
            <button
              type="button"
              onClick={() => onChangeLang("en")}
              className={`min-h-[32px] rounded-full px-3 text-xs font-bold transition-colors ${
                lang === "en"
                  ? "bg-[#1B2945] text-white"
                  : "text-[#34445F] hover:text-[#1B2945]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onChangeLang("id")}
              className={`min-h-[32px] rounded-full px-3 text-xs font-bold transition-colors ${
                lang === "id"
                  ? "bg-[#1B2945] text-white"
                  : "text-[#34445F] hover:text-[#1B2945]"
              }`}
            >
              ID
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B2945]/15 bg-white text-[#1B2945] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#1B2945]/10 bg-[#F5F3F0] px-4 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1.5">
            {NAV_IDS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#1B2945] text-white"
                      : "bg-white/75 text-[#1B2945] hover:bg-white"
                  }`}
                >
                  <span>{t[item.key]}</span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#D5B5A5]" />
                  )}
                </a>
              );
            })}
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex min-h-[44px] items-center gap-2.5 rounded-xl border border-[#1B2945]/12 bg-white px-4 text-sm font-semibold text-[#1B2945]"
              >
                <Instagram className="h-4 w-4 text-[#A96850]" />
                <span>{instagram.handle}</span>
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
