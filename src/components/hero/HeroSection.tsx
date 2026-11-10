"use client";

import { ArrowDownRight, Sparkles, User } from "lucide-react";
import type { ProfileData, Translations } from "@/lib/types";

interface HeroSectionProps {
  t: Translations["hero"];
  profile: ProfileData;
}

export function HeroSection({ t, profile }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 md:pt-14 md:pb-16 lg:px-8"
    >
      {/* Outer wrapper allows the mascot to break out of the hero card boundary cleanly */}
      <div className="relative md:pt-14 lg:pt-16">
        {/* Main Rounded Horizontal Hero Card (inspired by Reference 1) */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#1B2945] text-white shadow-[0_24px_60px_-22px_rgba(27,41,69,0.42)] sm:rounded-[34px]">
          {/* Subtle dotted starfield inside dark area */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(#D5B5A5 1.25px, transparent 1.25px)",
              backgroundSize: "26px 26px",
            }}
          />
          {/* Decorative organic background shapes inside card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#34445F]/55"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 z-[1] hidden h-full w-[44%] rounded-l-[120px] bg-gradient-to-br from-[#F5F3F0] via-[#F5F3F0] to-[#D5B5A5]/75 md:block"
          />

          {/* Grid layout */}
          <div className="relative z-10 grid grid-cols-1 items-center md:grid-cols-12">
            {/* LEFT SIDE: Artist Identity & Exploration CTAs */}
            <div className="flex flex-col justify-between p-6 sm:p-9 md:col-span-7 md:py-12 md:pl-11 md:pr-6 lg:py-14 lg:pl-14">
              <div>
                {/* Pill identity badge */}
                <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#D5B5A5]/35 bg-[#34445F]/75 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#F5F3F0]">
                  <Sparkles className="h-3.5 w-3.5 text-[#D5B5A5]" />
                  <span>{t.badge}</span>
                </div>

                {/* Artist Name & Greeting */}
                <h1
                  className="animate-fade-up mt-5 font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.85rem]"
                  style={{ animationDelay: "70ms" }}
                >
                  {t.greeting}
                </h1>

                {/* Primary Brand Tagline */}
                <p
                  className="animate-fade-up mt-3 inline-block font-display text-base font-bold tracking-tight text-[#D5B5A5] sm:text-lg"
                  style={{ animationDelay: "130ms" }}
                >
                  &ldquo;{t.tagline}&rdquo;
                </p>

                {/* Personal Intro */}
                <p
                  className="animate-fade-up mt-4 max-w-xl text-sm leading-relaxed text-[#F5F3F0]/88 sm:text-[15.5px]"
                  style={{ animationDelay: "180ms" }}
                >
                  {t.intro}
                </p>

                {/* Exploration CTAs */}
                <div
                  className="animate-fade-up mt-7 flex flex-wrap items-center gap-3"
                  style={{ animationDelay: "230ms" }}
                >
                  <a
                    href="#portfolio"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#A96850] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b8745b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B5A5]"
                  >
                    <span>{t.primaryCta}</span>
                    <ArrowDownRight className="h-4 w-4" />
                  </a>

                  <a
                    href="#about"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#D5B5A5]/50 bg-[#34445F]/50 px-5 py-2.5 text-sm font-semibold text-[#F5F3F0] transition-all duration-200 hover:border-[#F5F3F0] hover:bg-[#34445F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5B5A5]"
                  >
                    <User className="h-4 w-4 text-[#D5B5A5]" />
                    <span>{t.secondaryCta}</span>
                  </a>
                </div>
              </div>

              {/* Subtle color-palette accent bars (inspired by Reference 1 bottom-left bars) */}
              <div
                aria-hidden="true"
                className="mt-8 hidden items-center gap-2 md:flex"
              >
                <span className="h-1.5 w-10 rounded-full bg-[#A96850]" />
                <span className="h-1.5 w-7 rounded-full bg-[#D5B5A5]" />
                <span className="h-1.5 w-7 rounded-full bg-[#34445F]" />
                <span className="ml-2 font-mono text-[11px] tracking-wider text-[#D5B5A5]/75">
                  {profile.handle}
                </span>
              </div>
            </div>

            {/* MOBILE/SMALL-TABLET MASCOT STAGE (intentional stacked composition) */}
            <div className="relative z-10 flex flex-col items-center justify-end bg-gradient-to-b from-[#F5F3F0] via-[#F5F3F0] to-[#EAD7CC] px-6 pt-8 pb-0 md:hidden">
              <div className="relative flex w-full max-w-[300px] items-end justify-center">
                {/* Tiny decorative hearts (nodding to Reference 1) */}
                <HeartAccent className="top-2 right-4 h-6 w-6 text-[#A96850]" />
                <HeartAccent className="top-10 left-3 h-4 w-4 text-[#D5B5A5]" />
                <img
                  src={profile.mascotImage}
                  alt={`${profile.artistName} (${profile.nickname}) official chibi mascot`}
                  className="animate-mascot-enter relative z-10 h-64 w-auto object-contain drop-shadow-[0_14px_24px_rgba(27,41,69,0.22)] sm:h-72"
                />
              </div>
            </div>

            {/* DESKTOP/TABLET SPACER FOR RIGHT COLUMN */}
            <div className="hidden md:col-span-5 md:block md:min-h-[380px] lg:min-h-[430px]" />
          </div>
        </div>

        {/* DESKTOP/TABLET OVERLAPPING MASCOT (extends beyond hero card boundary!) */}
        <div className="pointer-events-none absolute right-0 bottom-0 z-20 hidden items-end justify-center md:flex md:w-[46%] lg:right-[-16px] lg:w-[46%]">
          {/* Decorative floating accents near mascot (adapted from Reference 1 hearts) */}
          <HeartAccent className="animate-float-slow top-8 left-4 h-7 w-7 text-[#A96850] drop-shadow-xs lg:top-10 lg:left-10" />
          <HeartAccent
            className="animate-float-slow top-20 left-12 h-4 w-4 text-[#D5B5A5] lg:top-24 lg:left-20"
            delay="1.2s"
          />
          <SparkleAccent className="top-12 right-6 h-5 w-5 text-[#A96850]/85 lg:right-8" />

          <img
            src={profile.mascotImage}
            alt={`${profile.artistName} (${profile.nickname}) official chibi mascot in heart-hands pose`}
            className="animate-mascot-enter relative z-10 h-[405px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_30px_rgba(27,41,69,0.24)] lg:h-[515px] lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}

function HeartAccent({
  className = "",
  delay,
}: {
  className?: string;
  delay?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      style={delay ? { animationDelay: delay } : undefined}
      className={`pointer-events-none absolute z-20 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function SparkleAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
    </svg>
  );
}
