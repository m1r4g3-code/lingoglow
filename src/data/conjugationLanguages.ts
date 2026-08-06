// Which language ids have conjugation-drill content. LanguagePage (eagerly
// bundled) needs this to decide whether to show the "Conjugation Drills"
// tile, but importing CONJUGATIONS_BY_LANGUAGE from ConjugationPage.tsx
// directly would drag that whole lazy-loaded route's data into the main
// bundle. Keep this list in sync with CONJUGATIONS_BY_LANGUAGE's keys.
export const CONJUGATION_LANGUAGE_IDS: readonly string[] = ["es", "fr", "de", "it", "ar", "nl", "ru", "el", "hi"];
