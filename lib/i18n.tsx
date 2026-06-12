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

export type Locale = "en" | "sw";
export const LOCALES: Locale[] = ["en", "sw"];
export const DEFAULT_LOCALE: Locale = "en";
const STORAGE_KEY = "afyatrust.lang";

type Dict = Record<string, unknown>;

// English ships in the main bundle (it's the fallback); other languages
// lazy-load on demand. Adding a language = one JSON file + one loader line.
const dictionaries: Partial<Record<Locale, Dict>> = { en: en as unknown as Dict };
const loaders: Record<Locale, () => Promise<Dict>> = {
  en: async () => en as unknown as Dict,
  sw: async () => (await import("@/locales/sw/common.json")).default as unknown as Dict,
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
  // Always render English on the server and for hydration; the real locale is
  // applied right after mount so server and client markup never disagree.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  const activate = useCallback(async (l: Locale) => {
    if (!dictionaries[l]) dictionaries[l] = await loaders[l]();
    setLocaleState(l);
  }, []);

  // First visit: saved choice wins; otherwise follow the browser language.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: Locale =
      stored && (LOCALES as string[]).includes(stored)
        ? (stored as Locale)
        : navigator.language?.toLowerCase().startsWith("sw")
          ? "sw"
          : DEFAULT_LOCALE;
    if (initial !== DEFAULT_LOCALE) void activate(initial);
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
