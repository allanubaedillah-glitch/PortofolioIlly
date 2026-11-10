import { Compass, Heart, Palette, Sparkles, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Language, ProfileData, Translations } from "@/lib/types";

interface AboutSectionProps {
  t: Translations["about"];
  profile: ProfileData;
  lang: Language;
}

export function AboutSection({ t, profile, lang }: AboutSectionProps) {
  const journeyText =
    lang === "id"
      ? profile.journeyPlaceholderId
      : profile.journeyPlaceholderEn;

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-[#A96850] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A96850]" />
          {t.eyebrow}
        </span>
        <h2 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-[#1B2945] sm:text-3xl lg:text-[2.15rem]">
          {t.title}
        </h2>
      </Reveal>

      {/* Bento Grid inspired by Reference 1's rounded bento & stacked info pills */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
        {/* Left/Top Large Intro Card */}
        <Reveal className="md:col-span-7" delayMs={50}>
          <div className="flex h-full flex-col justify-between rounded-[26px] border border-[#1B2945]/10 bg-white p-6 shadow-[0_12px_32px_-20px_rgba(27,41,69,0.25)] sm:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F3F0] px-3.5 py-1.5 text-xs font-bold text-[#1B2945]">
                <Heart className="h-3.5 w-3.5 text-[#A96850]" />
                <span>{profile.artistName}</span>
                <span className="text-[#34445F]/60">({profile.nickname})</span>
              </div>

              <h3 className="mt-4 font-display text-xl font-extrabold text-[#1B2945] sm:text-2xl">
                {t.introTitle}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#34445F] sm:text-[15.5px]">
                {t.introBody}
              </p>
            </div>

            {/* Artistic Approach Callout */}
            <div className="mt-6 rounded-2xl border border-[#D5B5A5]/60 bg-[#F5F3F0]/85 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#1B2945] uppercase">
                <Palette className="h-4 w-4 text-[#A96850]" />
                <span>{t.approachTitle}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#34445F] sm:text-sm">
                {t.approachBody}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right Card: Official Mascot & Creative Interests Stacked Pills */}
        <Reveal className="md:col-span-5" delayMs={100}>
          <div className="flex h-full flex-col gap-5">
            {/* Mascot Reference Mini Card */}
            <div className="flex items-center gap-4 rounded-[26px] border border-[#1B2945]/10 bg-[#1B2945] p-5 text-white shadow-sm">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F5F3F0] p-1">
                <img
                  src={profile.mascotImage}
                  alt={`${profile.artistName} mascot`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#D5B5A5] uppercase">
                  {t.mascotCardLabel}
                </span>
                <p className="mt-0.5 font-display text-base font-bold text-white">
                  {profile.artistName} • {profile.nickname}
                </p>
                <p className="mt-1 text-xs leading-snug text-[#F5F3F0]/80">
                  {t.mascotCardNote}
                </p>
              </div>
            </div>

            {/* Creative Interests Stacked Pill Cards (inspired by Reference 1 right-column cards) */}
            <div className="flex-1 rounded-[26px] border border-[#1B2945]/10 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#1B2945] uppercase">
                <Sparkles className="h-4 w-4 text-[#A96850]" />
                <span>{t.interestsTitle}</span>
              </div>

              <div className="mt-4 flex flex-col gap-2.5">
                {profile.interests.map((interest, idx) => (
                  <div
                    key={interest.id}
                    className="flex items-start gap-3 rounded-2xl border border-[#1B2945]/8 bg-[#F5F3F0]/85 px-4 py-3 transition-colors hover:border-[#D5B5A5]"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#1B2945] font-mono text-[10px] font-bold text-white">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-[#1B2945]">
                        {lang === "id" ? interest.labelId : interest.labelEn}
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-[#34445F]">
                        {lang === "id" ? interest.noteId : interest.noteEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Row: Editable Journey & Tools Placeholders */}
        <Reveal className="md:col-span-6" delayMs={140}>
          <div className="h-full rounded-[26px] border border-[#1B2945]/10 bg-white p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#1B2945] uppercase">
                <Compass className="h-4 w-4 text-[#A96850]" />
                <span>{t.journeyTitle}</span>
              </div>
              <span className="rounded-full bg-[#D5B5A5]/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#1B2945]">
                Editable
              </span>
            </div>
            <p className="mt-3 rounded-2xl border border-dashed border-[#1B2945]/20 bg-[#F5F3F0]/70 p-4 text-xs leading-relaxed text-[#34445F] sm:text-sm">
              {journeyText}
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-6" delayMs={180}>
          <div className="h-full rounded-[26px] border border-[#1B2945]/10 bg-white p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-[#1B2945] uppercase">
                <Wrench className="h-4 w-4 text-[#A96850]" />
                <span>{t.toolsTitle}</span>
              </div>
              <span className="rounded-full bg-[#D5B5A5]/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#1B2945]">
                Editable
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.tools.map((tool) => (
                <span
                  key={tool.name}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                    tool.status === "placeholder"
                      ? "border border-dashed border-[#1B2945]/25 bg-[#F5F3F0] text-[#34445F]"
                      : "bg-[#1B2945] text-white"
                  }`}
                >
                  {tool.name}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#34445F]/75">{t.toolsNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
