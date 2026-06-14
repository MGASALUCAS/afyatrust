// Central SEO configuration - single source of truth for the canonical domain,
// shared metadata values and Schema.org structured data.
//
// afyatrust.com is the official production domain. If it ever changes, update
// SITE_URL here and everything (canonicals, sitemap, robots, JSON-LD) follows.

export const SITE_URL = "https://afyatrust.com";
export const SITE_NAME = "AfyaTrust";

const LOGO_URL = `${SITE_URL}/logo-teal.png`;

// English used for structured data - the audience search engines serve most
// widely; the on-page content itself is bilingual (sw default, en toggle).
const ORG_DESCRIPTION =
  "AfyaTrust is a membership-based health access platform connecting informal workers in Tanzania to contracted healthcare providers at negotiated, capped prices. Affordable monthly health memberships for riders, traders, vendors and families.";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "AfyaTrust Tanzania",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 702,
    height: 192,
  },
  slogan: "Health Without Financial Shock",
  description: ORG_DESCRIPTION,
  email: "support@afyatrust.com",
  telephone: "+255687331494",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dar es Salaam",
    addressCountry: "TZ",
  },
  areaServed: { "@type": "Country", name: "Tanzania" },
  knowsLanguage: ["sw", "en"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+255687331494",
      email: "support@afyatrust.com",
      availableLanguage: ["Swahili", "English"],
    },
  ],
  founder: [
    { "@id": `${SITE_URL}/about#johnson` },
    { "@id": `${SITE_URL}/about#hamidu` },
  ],
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: ORG_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["sw", "en"],
};

export const founderSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about#johnson`,
    name: "Johnson Thomson Daniel",
    jobTitle: "Founder & CEO",
    image: `${SITE_URL}/media/johnson-ceo.jpeg`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    description:
      "Healthcare entrepreneur building solutions that make healthcare more accessible and affordable for underserved communities in Tanzania.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about#hamidu`,
    name: "Hamidu Hafidhi Hassani",
    jobTitle: "Co-Founder, Marketing & Public Relations Manager",
    image: `${SITE_URL}/media/hamidu-marketing.jpeg`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    description:
      "Medical laboratory professional, creative director and documentarist. Directed the Changia Damu creative campaign in Dar es Salaam.",
  },
];

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
