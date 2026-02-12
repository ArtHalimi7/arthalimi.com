import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Try to load saved language from localStorage, fall back to 'en'
let savedLang = 'en';
try {
  const v = localStorage.getItem('preferredLanguage');
  if (v) savedLang = v;
} catch (e) {
  // ignore localStorage errors (e.g., SSR or blocked storage)
}

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: savedLang,
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    keySeparator: false, // allow keys with dots
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: true,
    },
  });

// Persist language changes to localStorage so selection survives reloads
i18n.on && i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('preferredLanguage', lng);
  } catch (e) {
    // ignore
  }
});

export default i18n;
