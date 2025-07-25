
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../language/translations';

type Locale = 'rw' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('rw');

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[locale];
    for (const k of keys) {
      result = result[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
            fallbackResult = fallbackResult[fk];
            if (fallbackResult === undefined) return key;
        }
        return fallbackResult || key;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
