import type { Language } from "../types";

/** Maps each supported language to one real, representative country for
 * globe display — using the ISO 3166-1 numeric code that the world-atlas
 * TopoJSON dataset keys its features by. Latin has no living country, so
 * it's deliberately absent here (it still has its own catalog entry and
 * page — it's just not pinned anywhere on a map of the modern world).
 * Yoruba and Hausa are both real languages of Nigeria, so they share a
 * country id; the info panel lists every language for a clicked country. */
export interface GlobeCountry {
  numericId: string;
  countryName: string;
  languageIds: string[];
}

export const GLOBE_COUNTRIES: GlobeCountry[] = [
  { numericId: "724", countryName: "Spain", languageIds: ["es"] },
  { numericId: "250", countryName: "France", languageIds: ["fr"] },
  { numericId: "276", countryName: "Germany", languageIds: ["de"] },
  { numericId: "380", countryName: "Italy", languageIds: ["it"] },
  { numericId: "682", countryName: "Saudi Arabia", languageIds: ["ar"] },
  { numericId: "156", countryName: "China", languageIds: ["zh"] },
  { numericId: "528", countryName: "Netherlands", languageIds: ["nl"] },
  { numericId: "566", countryName: "Nigeria", languageIds: ["yo", "ha"] },
  { numericId: "643", countryName: "Russia", languageIds: ["ru"] },
  { numericId: "300", countryName: "Greece", languageIds: ["el"] },
  { numericId: "356", countryName: "India", languageIds: ["hi"] },
];

export const SUPPORTED_NUMERIC_IDS = new Set(GLOBE_COUNTRIES.map((c) => c.numericId));

export function getGlobeCountryForLanguage(languageId: string): GlobeCountry | undefined {
  return GLOBE_COUNTRIES.find((c) => c.languageIds.includes(languageId));
}

/** Real, verifiable facts about each language — writing system and a
 * rounded, widely-cited native-speaker figure. Not LingoGlow usage
 * stats; these are encyclopedic facts about the languages themselves. */
export interface LanguageFact {
  writingSystem: string;
  speakerEstimate: string;
}

export const LANGUAGE_FACTS: Record<string, LanguageFact> = {
  es: { writingSystem: "Latin script", speakerEstimate: "~485 million native speakers" },
  fr: { writingSystem: "Latin script", speakerEstimate: "~80 million native speakers" },
  la: { writingSystem: "Latin script", speakerEstimate: "No native speakers today — a classical language" },
  de: { writingSystem: "Latin script", speakerEstimate: "~95 million native speakers" },
  it: { writingSystem: "Latin script", speakerEstimate: "~65 million native speakers" },
  ar: { writingSystem: "Arabic script, written right-to-left", speakerEstimate: "~370 million native speakers" },
  zh: { writingSystem: "Chinese characters (simplified)", speakerEstimate: "~940 million native speakers" },
  nl: { writingSystem: "Latin script", speakerEstimate: "~24 million native speakers" },
  yo: { writingSystem: "Latin script with tone marks", speakerEstimate: "~47 million native speakers" },
  ha: { writingSystem: "Latin script (also written in Ajami/Arabic script)", speakerEstimate: "~63 million native speakers" },
  ru: { writingSystem: "Cyrillic script", speakerEstimate: "~150 million native speakers" },
  el: { writingSystem: "Greek script", speakerEstimate: "~13 million native speakers" },
  hi: { writingSystem: "Devanagari script", speakerEstimate: "~345 million native speakers" },
};

/** A real sample word pulled from the language's own first lesson,
 * rather than an invented greeting — reuses whatever vocab already
 * exists instead of authoring new content just for the globe. */
export function getGlobeSample(language: Language, getLessons: (id: string) => { vocab: { front: string; back: string }[] }[]) {
  const firstCard = getLessons(language.id)[0]?.vocab[0];
  return firstCard ?? { front: language.nativeName, back: language.name };
}
