import {
  ArrowUpRight,
  Globe,
  Instagram,
  Mail,
  Palette,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { SocialLink, Translations } from "@/lib/types";

interface ContactSectionProps {
  t: Translations["contact"];
  socials: SocialLink[];
}

function getSocialIcon(id: string) {
  switch (id) {
    case "instagram":
      return Instagram;
    case "email":
      return Mail;
    case "behance":
    case "artstation":
      return Palette;
    default:
      return Globe;
  }
}

export function ContactSection({ t, socials }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 md:pt-14 md:pb-24 lg:px-8"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-[30px] border border-[#1B2945]/10 bg-[#1B2945] p-6 text-white shadow-[0_20px_50px_-24px_rgba(27,41,69,0.45)] sm:rounded-[34px] sm:p-10 lg:p-12">
          {/* Decorative accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[#34445F]/55"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-12 h-48 w-48 rounded-full bg-[#A96850]/20 blur-2xl"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-[#D5B5A5] uppercase">
                <Sparkles className="h-3.5 w-3.5 text-[#A96850]" />
                {t.eyebrow}
              </span>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-[2.2rem]">
                {t.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#F5F3F0]/85 sm:text-base">
                {t.subtitle}
              </p>
              <p className="mt-5 inline-block rounded-2xl border border-[#D5B5A5]/25 bg-[#34445F]/55 px-4 py-2.5 font-display text-sm font-semibold text-[#D5B5A5]">
                &ldquo;{t.closing}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
              {socials.map((item) => {
                const Icon = getSocialIcon(item.id);

                if (item.configured && item.url) {
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target={item.id === "email" ? undefined : "_blank"}
                      rel={
                        item.id === "email" ? undefined : "noopener noreferrer"
                      }
                      className="group flex min-h-[76px] items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white px-5 py-4 text-[#1B2945] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D5B5A5]"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1B2945] text-white transition-colors group-hover:bg-[#A96850]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-sm font-extrabold text-[#1B2945]">
                            {item.platform}
                          </p>
                          <p className="truncate text-xs font-medium text-[#34445F]">
                            {item.handle}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#A96850] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="flex min-h-[76px] items-center justify-between gap-3 rounded-2xl border border-dashed border-[#D5B5A5]/35 bg-[#34445F]/45 px-5 py-4 text-[#F5F3F0]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1B2945]/80 text-[#D5B5A5]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-display text-sm font-bold text-white">
                            {item.platform}
                          </p>
                          <span className="rounded-full bg-[#D5B5A5]/20 px-2 py-0.5 font-mono text-[10px] text-[#D5B5A5]">
                            {t.placeholderLabel}
                          </span>
                        </div>
                        <p className="truncate text-xs text-[#F5F3F0]/70">
                          {item.handle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
