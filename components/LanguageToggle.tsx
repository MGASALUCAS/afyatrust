"use client";

import { LOCALES, useI18n, type Locale } from "@/lib/i18n";

// Tiny inline flags — no extra image requests, crisp at any size.
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

// SW | EN segmented pill with flags. `light` matches the navbar's over-hero
// glass state. Compact on mobile, a touch roomier from `sm` up.
export default function LanguageToggle({ light = false }: { light?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("nav.languageLabel")}
      className={`flex items-center rounded-full border p-0.5 ${
        light ? "border-white/25 bg-white/10" : "border-line bg-white"
      }`}
    >
      {LOCALES.map((l) => {
        const Flag = FLAG[l];
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-700 uppercase tracking-wide transition-colors duration-200 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[12px] ${
              locale === l
                ? light
                  ? "bg-white text-teal"
                  : "bg-teal text-white"
                : light
                  ? "text-white/70 hover:text-white"
                  : "text-charcoal-muted hover:text-teal"
            }`}
          >
            <Flag className="h-2.5 w-[15px] overflow-hidden rounded-[2px] sm:h-3 sm:w-[18px]" />
            {l}
          </button>
        );
      })}
    </div>
  );
}
