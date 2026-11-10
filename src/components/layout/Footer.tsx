import type { Translations } from "@/lib/types";

interface FooterProps {
  t: Translations["footer"];
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-[#1B2945]/10 bg-[#F5F3F0]/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-[#34445F] sm:flex-row sm:px-6 lg:px-8 sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#1B2945] font-display text-[11px] font-bold tracking-tight text-white">
            RB
          </span>
          <span className="font-medium text-[#1B2945]">{t.madeWith}</span>
        </div>
        <p className="text-[#34445F]/85">{t.rights}</p>
      </div>
    </footer>
  );
}
