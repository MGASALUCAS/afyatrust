"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, useI18n, type Locale } from "@/lib/i18n";

// Tiny inline flags - no extra image requests, crisp at any size.
function TzFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <polygon points="0,0 24,0 0,16" fill="#1EB53A" />
      <polygon points="24,0 24,16 0,16" fill="#00A3DD" />
      <line x1="0" y1="16" x2="24" y2="0" stroke="#FCD116" strokeWidth="7" />
      <line x1="0" y1="16" x2="24" y2="0" stroke="#000" strokeWidth="4.5" />
    </svg>
  );
}

function UkFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" strokeWidth="3.5" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M12,0 V16 M0,8 H24" stroke="#fff" strokeWidth="5.5" />
      <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

const FLAG: Record<Locale, typeof TzFlag> = { sw: TzFlag, en: UkFlag };
const LABEL: Record<Locale, string> = { sw: "Kiswahili", en: "English" };

// Compact language switcher: shows only the active language's flag. Clicking
// it reveals a dropdown of the other language(s) to swap to. `light` matches
// the navbar's over-hero glass state.
export default function LanguageToggle({ light = false }: { light?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const Current = FLAG[locale];
  const others = LOCALES.filter((l) => l !== locale);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.languageLabel")}
        className={`flex items-center gap-1.5 rounded-full border px-2 py-1 text-[12px] font-700 uppercase tracking-wide transition-colors duration-200 sm:px-2.5 ${
          light
            ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
            : "border-line bg-white text-charcoal hover:border-sage"
        }`}
      >
        <Current className="h-3 w-[18px] overflow-hidden rounded-[2px]" />
        <span>{locale}</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("nav.languageLabel")}
          className="absolute right-0 top-full z-50 mt-2 min-w-[150px] overflow-hidden rounded-xl2 border border-line bg-white p-1 shadow-soft"
        >
          {others.map((l) => {
            const Flag = FLAG[l];
            return (
              <li key={l} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-600 text-charcoal-muted transition-colors hover:bg-sage-mist hover:text-teal"
                >
                  <Flag className="h-3.5 w-[21px] overflow-hidden rounded-[2px]" />
                  <span>{LABEL[l]}</span>
                  <span className="ml-auto text-[11px] font-700 uppercase tracking-wide text-charcoal-faint">
                    {l}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
