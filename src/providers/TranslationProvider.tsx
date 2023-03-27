import React from 'react';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { en, es, pt } from '../locales';

type IProps = {
  children: React.ReactNode;
  language?: string;
};

export enum Languages {
  es = 'es',
  en = 'en',
  pt = 'pt',
}

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
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: Languages.en,
    interpolation: {
      escapeValue: false,
    },
  });

export const TranslationProvider = ({ children }: IProps) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
