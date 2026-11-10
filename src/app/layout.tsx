import type { Metadata } from "next";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "RawonBillish (Illy) — Personal Artist Portfolio",
  description:
    "Just a Little Artist in a Big Creative World. Personal artist portfolio & creative playground of RawonBillish (Illy): original characters, digital illustrations, pixel art, and visual experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#D5B5A5]/60 selection:text-[#1B2945]">
        {children}
      </body>
    </html>
  );
}
