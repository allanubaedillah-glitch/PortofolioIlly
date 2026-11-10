import React from "react";

export function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-studio-paper"
    >
      {/* Soft warm radial blooms */}
      <div className="absolute -top-36 -left-32 h-[420px] w-[420px] rounded-full bg-[#D5B5A5]/25 blur-3xl" />
      <div className="absolute top-[38%] -right-40 h-[460px] w-[460px] rounded-full bg-[#D5B5A5]/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 h-[380px] w-[380px] rounded-full bg-[#34445F]/[0.06] blur-3xl" />

      {/* Subtle sketchbook margin lines & tiny artistic symbols */}
      <svg
        className="absolute right-8 top-28 hidden h-32 w-32 text-[#1B2945]/[0.05] lg:block"
        viewBox="0 0 120 120"
        fill="none"
      >
        <circle cx="60" cy="60" r="46" stroke="currentColor" strokeDasharray="5 6" strokeWidth="1.5" />
        <path d="M60 8V22M60 98V112M8 60H22M98 60H112" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <svg
        className="absolute left-6 top-[56%] hidden h-24 w-24 text-[#A96850]/[0.09] xl:block"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path
          d="M40 10L44.5 31.5L66 36L44.5 40.5L40 62L35.5 40.5L14 36L35.5 31.5L40 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
