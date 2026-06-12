// Structural data only (prices, links, names, numbers).
// All translatable copy lives in /locales/{en,sw}/common.json.

// Official brand lines — used in metadata (the default, English).
export const TAGLINE = "Health Without Financial Shock";
export const TAGLINE_SUB = "Built for informal workers & families in Tanzania";

export const WHATSAPP_NUMBER = "0687 331 494";
export const WHATSAPP_LINK =
  "https://wa.me/255687331494?text=" +
  encodeURIComponent("Hi AfyaTrust, I would like to join.");

// Co-founders — edit names here. Roles are translated in the locale files
// (about.roles, same order). Photo: public/media/founders.jpeg
export type Founder = { name: string; role: string };

export const founders: Founder[] = [
  { name: "Co-founder One", role: "Co-founder & CEO" },
  { name: "Co-founder Two", role: "Co-founder & Product" },
];

// Plan names and prices are not translated; taglines live in plans.taglines
// in the locale files, keyed by plan name.
export type Package = {
  name: string;
  registration: string;
  monthly: string;
  recommended: boolean;
};

export const packages: Package[] = [
  { name: "Jamii Afya", registration: "20,000", monthly: "10,000", recommended: false },
  { name: "Rider Basic", registration: "30,000", monthly: "15,000", recommended: false },
  { name: "Mama Bora", registration: "40,000", monthly: "20,000", recommended: true },
  { name: "Rider Max", registration: "50,000", monthly: "25,000", recommended: false },
  { name: "Familia", registration: "50,000", monthly: "25,000", recommended: false },
];

// Stat values; labels are translated in impact.stats (same order).
export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Members protected" },
  { value: 300, suffix: "+", label: "Clinic visits" },
  { value: 12, suffix: "", label: "Partner clinics" },
  { value: 99.5, suffix: "%", label: "Uptime goal" },
];
