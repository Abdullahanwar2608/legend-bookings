import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import fi from './locales/fi/translation.json';

const SUPPORTED = ['fi', 'en'];

// Read saved language from localStorage (set by LanguageSwitcher)
const saved = typeof window !== 'undefined'
  ? localStorage.getItem('app-lang')
  : null;

// Default to Finnish on first visit
const activeLang = saved && SUPPORTED.includes(saved) ? saved : 'fi';

// Apply lang immediately on load before React mounts
if (typeof document !== 'undefined') {
  document.documentElement.lang = activeLang;
  document.documentElement.dir = 'ltr';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fi: { translation: fi },
    },
    lng: activeLang,
    fallbackLng: 'en',
    initImmediate: false,
    interpolation: { escapeValue: false },
  });

export default i18n;
