//Users/salehalkarabubi/works/project/AutoMarket25/client/src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation JSON files
import translationEN from './locales/en.json';
import translationDE from './locales/de.json';

i18n
  // Detect user language (browser, then cache)
  .use(LanguageDetector)
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: translationEN },
      de: { translation: translationDE }
    },
    fallbackLng: 'en',               // default language if detection fails
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']       // cache user choice in localStorage:contentReference[oaicite:2]{index=2}
    },
    interpolation: {
      escapeValue: false             // React already escapes by default
    }
  });

export default i18n;
