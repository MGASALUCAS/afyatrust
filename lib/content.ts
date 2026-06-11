// Single source of truth. Copy is deliberately short — every line earns its place.

// Official brand lines — use these everywhere a tagline appears.
export const TAGLINE = "Health Without Financial Shock";
export const TAGLINE_SUB = "Built for informal workers & families in Tanzania";

export const WHATSAPP_NUMBER = "0687 331 494";
export const WHATSAPP_LINK =
  "https://wa.me/255687331494?text=" +
  encodeURIComponent("Hi AfyaTrust, I would like to join.");

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "How it works", href: "/#how" },
  { label: "Plans", href: "/#plans" },
  { label: "Impact", href: "/#impact" },
  { label: "About", href: "/about" },
];

// Co-founders — edit names/roles here. Photo: public/media/founders.jpg
export type Founder = { name: string; role: string };

export const founders: Founder[] = [
  { name: "Co-founder One", role: "Co-founder & CEO" },
  { name: "Co-founder Two", role: "Co-founder & Product" },
];

export type Belief = { title: string; desc: string };

export const beliefs: Belief[] = [
  {
    title: "Start in the market",
    desc: "Every plan begins with the people who'll use it — not a boardroom.",
  },
  {
    title: "Cash should never decide",
    desc: "No one should weigh a fever against a day's earnings.",
  },
  {
    title: "Protect the work",
    desc: "Healthy people keep riding, trading and providing. That's the goal.",
  },
];

// The cinematic journey — the story the homepage tells as you scroll.
export type JourneyStep = { k: string; title: string; line: string };

export const journey: JourneyStep[] = [
  { k: "01", title: "You join", line: "A rider, a trader, a mother. One small monthly payment." },
  { k: "02", title: "You're covered", line: "Membership confirmed. No paperwork. No waiting." },
  { k: "03", title: "You walk in", line: "Any partner clinic near you. Just show you're a member." },
  { k: "04", title: "You're treated", line: "Care first. No cash at the counter. No fear." },
];

export type Step = { n: string; title: string; desc: string };

export const steps: Step[] = [
  { n: "01", title: "Choose a plan", desc: "Pick what fits your life." },
  { n: "02", title: "Pay monthly", desc: "Small, predictable, yours." },
  { n: "03", title: "Walk into a clinic", desc: "Partner clinics near you." },
  { n: "04", title: "Get treated", desc: "No cash at the counter." },
];

export type Package = {
  name: string;
  tagline: string;
  registration: string;
  monthly: string;
  recommended: boolean;
};

export const packages: Package[] = [
  { name: "Jamii Afya", tagline: "For the community.", registration: "20,000", monthly: "10,000", recommended: false },
  { name: "Rider Basic", tagline: "For the rider.", registration: "30,000", monthly: "15,000", recommended: false },
  { name: "Mama Bora", tagline: "For mothers & women in business.", registration: "40,000", monthly: "20,000", recommended: true },
  { name: "Rider Max", tagline: "More cover, more days on the road.", registration: "50,000", monthly: "25,000", recommended: false },
  { name: "Familia", tagline: "For the whole family.", registration: "50,000", monthly: "25,000", recommended: false },
];

export type ReasonIcon = "wallet" | "bolt" | "shield";
export type Reason = { title: string; desc: string; icon: ReasonIcon };

export const reasons: Reason[] = [
  { title: "Affordable", desc: "A cost you can plan for.", icon: "wallet" },
  { title: "Fast access", desc: "Clinics where you live and work.", icon: "bolt" },
  { title: "Peace of mind", desc: "Work without the fear of a bill.", icon: "shield" },
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Members protected" },
  { value: 300, suffix: "+", label: "Clinic visits" },
  { value: 12, suffix: "", label: "Partner clinics" },
  { value: 99.5, suffix: "%", label: "Uptime goal" },
];

export type Story = { quote: string; name: string; role: string };

export const stories: Story[] = [
  { quote: "I ride every day. Now a clinic visit won't empty my pocket.", name: "Juma", role: "Rider · Dar es Salaam" },
  { quote: "My family's health used to be my biggest worry. Now it's handled.", name: "Neema", role: "Trader · Mwanza" },
];
