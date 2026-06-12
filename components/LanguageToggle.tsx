"use client";

import { LOCALES, useI18n } from "@/lib/i18n";

// EN | SW segmented pill. `light` matches the navbar's over-hero glass state.
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
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 text-[12px] font-700 uppercase tracking-wide transition-colors duration-200 ${
            locale === l
              ? light
                ? "bg-white text-teal"
                : "bg-teal text-white"
              : light
                ? "text-white/70 hover:text-white"
                : "text-charcoal-muted hover:text-teal"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
