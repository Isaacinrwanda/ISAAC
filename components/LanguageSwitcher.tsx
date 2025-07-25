import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useContext(LanguageContext);

  const buttonStyle = "px-3 py-1 rounded-md text-sm font-medium transition-colors";
  const activeStyle = "bg-brand-primary text-white";
  const inactiveStyle = "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600";

  return (
    <div className="flex items-center p-1 space-x-1 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-inner">
      <button
        onClick={() => setLocale('rw')}
        className={`${buttonStyle} ${locale === 'rw' ? activeStyle : inactiveStyle}`}
      >
        Kinyarwanda
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`${buttonStyle} ${locale === 'en' ? activeStyle : inactiveStyle}`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;