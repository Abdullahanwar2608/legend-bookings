import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import fi from './locales/fi/translation.json';

const SUPPORTED = ['fi', 'en'];

// Read saved language from localStorage (set by LanguageSwitcher)
// Only treat the stored value as valid if the user explicitly set it.
const saved = typeof window !== 'undefined'
  ? localStorage.getItem('app-lang')
  : null;

// Default to Finnish on every first visit (no valid saved language)
const activeLang = (saved && SUPPORTED.includes(saved)) ? saved : 'fi';

// Persist Finnish immediately on first visit so LanguageSwitcher
// doesn't race and accidentally overwrite with browser language.
if (typeof window !== 'undefined' && !saved) {
  localStorage.setItem('app-lang', 'fi');
}

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
    fallbackLng: 'fi',
    initImmediate: false,
    // Disable all automatic language detection — we manage language ourselves
    detection: undefined,
    interpolation: { escapeValue: false },
  });

export default i18n;
