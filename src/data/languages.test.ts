import { describe, expect, it } from 'vitest';
import { languages, lessonsByLanguage } from './languages';
import { GRAMMAR_BY_LANGUAGE } from '../pages/GrammarPage';
import { COMPREHENSION_BY_LANGUAGE } from '../pages/ComprehensionPage';
import { SENTENCES_BY_LANGUAGE } from '../pages/SentenceBuilderPage';
import { CONJUGATIONS_BY_LANGUAGE } from '../pages/ConjugationPage';

// Guards against the exact bug class this registry pattern invites: a
// language's content data file exists but never got wired into a page's
// lookup map, so the file is dead code and the practice page silently
// renders an empty state instead of the content.
describe('content completeness across all registered languages', () => {
  for (const language of languages) {
    describe(language.id, () => {
      it('has at least one lesson', () => {
        expect(lessonsByLanguage[language.id]?.length).toBeGreaterThan(0);
      });

      it('has at least one grammar sheet', () => {
        expect(GRAMMAR_BY_LANGUAGE[language.id]?.length).toBeGreaterThan(0);
      });

      it('has at least one comprehension passage', () => {
        expect(COMPREHENSION_BY_LANGUAGE[language.id]?.length).toBeGreaterThan(0);
      });

      it('has at least one sentence-building exercise', () => {
        expect(SENTENCES_BY_LANGUAGE[language.id]?.length).toBeGreaterThan(0);
      });
    });
  }

  it('every conjugation entry belongs to a real registered language', () => {
    const languageIds = new Set(languages.map((l) => l.id));
    for (const id of Object.keys(CONJUGATIONS_BY_LANGUAGE)) {
      expect(languageIds.has(id)).toBe(true);
    }
  });
});
