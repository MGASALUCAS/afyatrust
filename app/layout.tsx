import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_URL, SITE_NAME, organizationSchema, webSiteSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
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

// Kiswahili is the site's default language - metadata follows it.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: sw.meta.title,
  description: sw.meta.description,
  applicationName: SITE_NAME,
  keywords: [
    "AfyaTrust",
    "uanachama wa afya Tanzania",
    "health membership Tanzania",
    "bima ya afya bodaboda",
    "matibabu kwa bei nafuu",
    "affordable healthcare Tanzania",
    "informal workers health Tanzania",
    "health access Dar es Salaam",
  ],
  category: "healthcare",
  alternates: { canonical: "/" },
  verification: {
    google: "afBQNKcGePHCMfY7cYlXQjz4UdN92JURlWbttE250SU",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "sw_TZ",
    alternateLocale: ["en_US"],
    title: sw.meta.title,
    description: sw.meta.description,
    images: [
      {
        url: "/logo-teal.png",
        width: 702,
        height: 192,
        alt: "AfyaTrust - Health Without Financial Shock",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: sw.meta.title,
    description: sw.meta.description,
    images: ["/logo-teal.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sw" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
