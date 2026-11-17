import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import de from './locales/de.json';

const SUPPORTED = ['en', 'de'];
const browser = typeof window !== 'undefined';

/** The visitor's explicit choice (set only by the EN/DE switch). */
export function savedLanguage() {
  try {
    const saved = browser ? localStorage.getItem('lang') : null;
    return SUPPORTED.includes(saved) ? saved : null;
  } catch {
    return null; // storage blocked
  }
}
export function saveLanguage(lng) {
  try { localStorage.setItem('lang', lng); } catch { /* ignore */ }
}
export function browserLanguage() {
  const nav = (browser && navigator.language ? navigator.language : 'en').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : 'en';
}

// The URL decides on the home pages (/ is English, /de is German); elsewhere the visitor's choice or browser language.
function initialLanguage() {
  if (!browser) return 'en';
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/de') return 'de';
  if (path === '/') return 'en';
  return savedLanguage() ?? browserLanguage();
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, de: { translation: de } },
  lng: initialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
});

if (browser) {
  i18n.on('languageChanged', (lng) => { document.documentElement.lang = lng; });
  document.documentElement.lang = i18n.language;
}

export default i18n;
