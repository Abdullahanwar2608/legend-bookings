import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';
import ur from './locales/ur/translation.json';
import fr from './locales/fr/translation.json';

const SUPPORTED = ['en', 'ar', 'ur', 'fr'];

// Read saved language from localStorage (set by LanguageSwitcher)
const saved = typeof window !== 'undefined'
  ? localStorage.getItem('app-lang')
  : null;

const activeLang = saved && SUPPORTED.includes(saved) ? saved : 'en';

// Apply dir immediately on load so RTL works before React mounts
if (typeof document !== 'undefined') {
  document.documentElement.lang = activeLang;
  document.documentElement.dir = ['ar', 'ur'].includes(activeLang) ? 'rtl' : 'ltr';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      ur: { translation: ur },
      fr: { translation: fr },
    },
    lng: activeLang,
    fallbackLng: 'en',
    initImmediate: false,
    interpolation: { escapeValue: false },
  });

export default i18n;

