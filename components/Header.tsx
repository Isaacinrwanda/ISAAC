
import React, { useState } from 'react';
import { Language } from '../types';
import { BookOpenIcon, BarChartIcon, SettingsIcon } from './icons';
import { LANGUAGE_OPTIONS } from '../constants';

interface HeaderProps {
  currentView: 'library' | 'dashboard';
  onNavigate: (view: 'library' | 'dashboard') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, language, onLanguageChange }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-40 p-3">
      <div className="container mx-auto flex justify-between items-center max-w-5xl">
        <h1 className="text-2xl font-bold text-blue-600">Inkurunziza</h1>
        
        <nav className="flex items-center gap-2 bg-blue-100 p-1.5 rounded-full">
          <button 
            onClick={() => onNavigate('library')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-md font-semibold transition-colors ${currentView === 'library' ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-200'}`}
          >
            <BookOpenIcon className="w-5 h-5" />
            <span>Stories</span>
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-md font-semibold transition-colors ${currentView === 'dashboard' ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-200'}`}
          >
            <BarChartIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </nav>

        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-full transition-transform hover:scale-105"
          >
            <SettingsIcon className="w-5 h-5" />
            <span>{LANGUAGE_OPTIONS[language].flag}</span>
          </button>
          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-2 animate-modal-pop">
              {Object.values(Language).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                    setIsLangMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 flex items-center gap-3"
                >
                  <span className="text-xl">{LANGUAGE_OPTIONS[lang].flag}</span>
                  <span>{LANGUAGE_OPTIONS[lang].label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
