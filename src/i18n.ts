import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';
import ur from './locales/ur/translation.json';
import fr from './locales/fr/translation.json';

const SUPPORTED_LANGS = ['en', 'ar', 'ur', 'fr'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      ur: { translation: ur },
      fr: { translation: fr },
    },
    // Use saved language from localStorage, else fall back to English
    lng: (() => {
      const saved = localStorage.getItem('i18nextLng');
      return saved && SUPPORTED_LANGS.includes(saved) ? saved : 'en';
    })(),
    fallbackLng: 'en',
    // Synchronous init — guarantees translations are ready before first render
    initImmediate: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
  });

export default i18n;
