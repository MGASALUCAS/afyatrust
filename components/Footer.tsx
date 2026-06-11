import Image from "next/image";
import { WHATSAPP_NUMBER, WHATSAPP_LINK, TAGLINE, TAGLINE_SUB } from "@/lib/content";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Plans", href: "/#plans" },
      { label: "Impact", href: "/#impact" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-teal-dark">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand — white wordmark on the brand-dark background */}
          <div>
            <Image
              src="/logo-white.png"
              alt="AfyaTrust — Health without financial shock"
              width={702}
              height={192}
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
              {TAGLINE}. {TAGLINE_SUB}.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-block text-[15px] font-600 text-sage hover:text-white"
            >
              WhatsApp {WHATSAPP_NUMBER}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/45">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} AfyaTrust. All rights reserved.</p>
          <p>{TAGLINE_SUB}.</p>
        </div>
      </div>
    </footer>
  );
}
