import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { en, es, pt } from './locales';

const resources = {
  en: {
    translation: {
      ...en,
    },
  },
  es: {
    translation: {
      ...es,
    },
  },
  pt: {
    translation: {
      ...pt,
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
