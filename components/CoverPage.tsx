
import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

interface CoverPageProps {
  onProceed: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onProceed }) => {
  const { t } = useContext(LanguageContext);
  
  return (
    <div className="w-full max-w-md mx-auto text-center animate-fade-in">
        <div className="bg-red-600 shadow-2xl rounded-2xl p-10">
            <h1 className="text-6xl font-extrabold text-white mb-8 tracking-wider drop-shadow-lg">
                {t('cover.title')}
            </h1>
            <button
                onClick={onProceed}
                className="w-full py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-transform transform hover:scale-105"
            >
                {t('cover.button')}
            </button>
        </div>
    </div>
  );
};

export default CoverPage;
