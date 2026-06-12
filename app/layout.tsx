import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { TAGLINE, TAGLINE_SUB } from "@/lib/content";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afyatrust.co.tz"),
  title: `AfyaTrust — ${TAGLINE}`,
  description: `AfyaTrust helps riders, traders, vendors and families access healthcare through affordable monthly health memberships. ${TAGLINE_SUB}.`,
  keywords: [
    "AfyaTrust",
    "health membership Tanzania",
    "healthcare access",
    "boda boda health",
    "affordable healthcare Tanzania",
  ],
  openGraph: {
    title: `AfyaTrust — ${TAGLINE}`,
    description: `Affordable monthly health memberships. ${TAGLINE_SUB}.`,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
