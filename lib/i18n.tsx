"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "@/locales/en/common.json";
import sw from "@/locales/sw/common.json";

export type Locale = "en" | "sw";
// Kiswahili first - it is the site's default language.
export const LOCALES: Locale[] = ["sw", "en"];
export const DEFAULT_LOCALE: Locale = "sw";
const STORAGE_KEY = "afyatrust.lang";

type Dict = Record<string, unknown>;

// Kiswahili (default) and English (fallback) both ship in the main bundle;
// future languages lazy-load on demand - one JSON file + one loader line each.
const dictionaries: Partial<Record<Locale, Dict>> = {
  en: en as unknown as Dict,
  sw: sw as unknown as Dict,
};
const loaders: Record<Locale, () => Promise<Dict>> = {
  en: async () => en as unknown as Dict,
  sw: async () => sw as unknown as Dict,
};

function lookup(dict: Dict | undefined, path: string): unknown {
  if (!dict) return undefined;
  return path
    .split(".")
    .reduce<unknown>(
      (node, part) => (node && typeof node === "object" ? (node as Dict)[part] : undefined),
      dict,
    );
}

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Translate a dot-path key to a string; falls back to English, then the key. */
  t: (key: string) => string;
  /** Translate a dot-path key to structured content (arrays/objects). */
  tr: <T>(key: string) => T;
};

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always render the default locale on the server and for hydration; a saved
  // preference is applied right after mount so server and client never disagree.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  const activate = useCallback(async (l: Locale) => {
    if (!dictionaries[l]) dictionaries[l] = await loaders[l]();
    setLocaleState(l);
  }, []);

  // Everyone starts in Kiswahili; only an explicitly saved choice overrides it.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LOCALES as string[]).includes(stored) && stored !== DEFAULT_LOCALE) {
      void activate(stored as Locale);
    }
  }, [activate]);

  const setLocale = useCallback(
    (l: Locale) => {
      window.localStorage.setItem(STORAGE_KEY, l);
      void activate(l);
    },
    [activate],
  );

  // Keep <html lang> honest for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => {
        const hit = lookup(dictionaries[locale], key) ?? lookup(dictionaries.en, key);
        return typeof hit === "string" ? hit : key;
      },
      tr: <T,>(key: string) =>
        (lookup(dictionaries[locale], key) ?? lookup(dictionaries.en, key)) as T,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
