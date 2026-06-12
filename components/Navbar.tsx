"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WHATSAPP_LINK } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

function Logo({ light }: { light: boolean }) {
  // White wordmark over the dark hero glass; teal wordmark on the white header.
  return (
    <a href="#top" className="flex items-center">
      <Image
        src={light ? "/logo-white.png" : "/logo-teal.png"}
        alt="AfyaTrust — Health without financial shock"
        width={702}
        height={192}
        priority
        className="h-8 w-auto sm:h-9"
      />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();
  const pathname = usePathname();

  const navItems = [
    { href: "/#how", label: t("nav.how") },
    { href: "/#plans", label: t("nav.plans") },
    { href: "/#impact", label: t("nav.impact") },
    { href: "/about", label: t("nav.about") },
  ];
  // Only the home page has a dark full-screen hero to ride over.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Ride light only over the home hero (not scrolled, menu closed).
  const light = overHero && !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto w-full max-w-content rounded-2xl border transition-all duration-300 ${
          scrolled || open || !overHero
            ? "border-line bg-white/90 shadow-soft backdrop-blur-xl"
            : "border-white/15 bg-white/10 backdrop-blur-md"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
          <Logo light={light} />

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium transition-colors hover:opacity-100 ${
                  light ? "text-white/80 hover:text-white" : "text-charcoal-muted hover:text-teal"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle light={light} />
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener"
              className={`btn py-2.5 px-5 ${
                light
                  ? "bg-white text-teal hover:-translate-y-0.5"
                  : "bg-teal text-white hover:bg-teal-deep hover:-translate-y-0.5"
              }`}
            >
              {t("nav.cta")}
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle light={light} />
            <button
              aria-label={t("nav.menuToggle")}
              onClick={() => setOpen((v) => !v)}
              className={`grid h-10 w-10 place-items-center rounded-lg border ${
                light ? "border-white/30 text-white" : "border-line text-charcoal"
              }`}
            >
              <span className="space-y-1.5">
                <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line md:hidden">
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-[16px] font-medium text-charcoal hover:bg-sage-mist"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                {t("nav.cta")}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
