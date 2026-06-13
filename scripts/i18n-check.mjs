// i18n quality gate - run with: npm run i18n:check
//
// Verifies, for every locale against English (the reference):
//   1. Structure parity  - no missing or extra keys (no untranslated screens).
//   2. No empty strings  - every key has real content.
//   3. No untranslated copy - values identical to English are flagged unless
//      they are structural (hrefs, numbers) or allowlisted brand/proper nouns.
//   4. Placeholder consistency - {tokens} used in EN must survive translation.

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = join(root, "locales");
const REFERENCE = "en";

// Keys whose values are structural, not copy.
const STRUCTURAL_KEY = /(^|\.)(href|k|n|name|value|suffix)$/;

// Words/phrases legitimately identical in both languages.
const SAME_OK = new Set([
  "AfyaTrust",
  "WhatsApp",
  "TZS",
  "Jamii Afya",
  "Rider Basic",
  "Mama Bora",
  "Rider Max",
  "Familia",
  "Juma",
  "Neema",
  "EN",
  "SW",
]);

function flatten(obj, prefix = "", out = new Map()) {
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val !== null && typeof val === "object") flatten(val, path, out);
    else out.set(path, val);
  }
  return out;
}

const placeholders = (s) => (typeof s === "string" ? (s.match(/\{[^}]+\}/g) ?? []).sort() : []);

const load = (locale) =>
  flatten(JSON.parse(readFileSync(join(localesDir, locale, "common.json"), "utf8")));

const reference = load(REFERENCE);
const locales = readdirSync(localesDir).filter((l) => l !== REFERENCE);
let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};

for (const locale of locales) {
  console.log(`\nChecking "${locale}" against "${REFERENCE}" (${reference.size} keys)`);
  const dict = load(locale);

  // 1. Structure parity
  for (const key of reference.keys()) if (!dict.has(key)) fail(`missing key: ${key}`);
  for (const key of dict.keys()) if (!reference.has(key)) fail(`extra key: ${key}`);

  for (const [key, value] of dict) {
    if (!reference.has(key)) continue;
    const ref = reference.get(key);

    // 2. No empty strings
    if (typeof value === "string" && value.trim() === "") fail(`empty value: ${key}`);

    // 3. Untranslated copy (identical to English)
    if (
      typeof value === "string" &&
      typeof ref === "string" &&
      value === ref &&
      !STRUCTURAL_KEY.test(key) &&
      !SAME_OK.has(value.trim())
    )
      fail(`identical to English (untranslated?): ${key} = "${value}"`);

    // 4. Placeholder consistency
    const a = placeholders(ref).join(",");
    const b = placeholders(value).join(",");
    if (a !== b) fail(`placeholder mismatch at ${key}: EN [${a}] vs ${locale} [${b}]`);
  }

  if (failures === 0) console.log(`  ✓ ${dict.size} keys OK`);
}

if (failures > 0) {
  console.error(`\n${failures} i18n problem(s) found.`);
  process.exit(1);
}
console.log("\nAll locales pass.");
