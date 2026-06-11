import Image from "next/image";
import { WHATSAPP_NUMBER, WHATSAPP_LINK, TAGLINE, TAGLINE_SUB } from "@/lib/content";
import { WhatsAppIcon } from "./Icons";

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
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-2.5 pl-3 pr-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon width={18} height={18} />
              </span>
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/55">
                  Chat with us
                </span>
                <span className="text-[15px] font-600 text-white">{WHATSAPP_NUMBER}</span>
              </span>
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
