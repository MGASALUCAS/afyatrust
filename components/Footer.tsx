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
    <footer className="border-t border-line bg-white">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M12 20s-7-4.2-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.8-7 9-7 9Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-display text-[19px] font-700 tracking-tight text-charcoal">
                Afya<span className="text-teal">Trust</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-charcoal-muted">
              {TAGLINE}. {TAGLINE_SUB}.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-block text-[15px] font-600 text-teal hover:text-teal-deep"
            >
              WhatsApp {WHATSAPP_NUMBER}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-charcoal-faint">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] text-charcoal-muted transition-colors hover:text-teal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[13px] text-charcoal-faint sm:flex-row">
          <p>© {new Date().getFullYear()} AfyaTrust. All rights reserved.</p>
          <p>{TAGLINE_SUB}.</p>
        </div>
      </div>
    </footer>
  );
}
