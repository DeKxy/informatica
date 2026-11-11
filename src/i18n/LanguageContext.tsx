import { createContext } from 'react';
import type { Language, TranslationKey } from './translations';

export type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
