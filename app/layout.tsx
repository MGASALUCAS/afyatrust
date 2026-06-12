import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import sw from "@/locales/sw/common.json";
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

// Kiswahili is the site's default language — metadata follows it.
export const metadata: Metadata = {
  metadataBase: new URL("https://afyatrust.co.tz"),
  title: sw.meta.title,
  description: sw.meta.description,
  keywords: [
    "AfyaTrust",
    "uanachama wa afya Tanzania",
    "health membership Tanzania",
    "bima ya afya bodaboda",
    "matibabu kwa bei nafuu",
    "affordable healthcare Tanzania",
  ],
  openGraph: {
    title: sw.meta.title,
    description: sw.meta.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sw" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
