
import React, { useState, useContext } from 'react';
import type { InterviewConfig } from '../types';
import { LanguageContext } from '../contexts/LanguageContext';

interface SetupFormProps {
  onStart: (config: InterviewConfig) => void;
  isLoading: boolean;
}

const SetupForm: React.FC<SetupFormProps> = ({ onStart, isLoading }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { t } = useContext(LanguageContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) {
      setError(t('setup.form.error'));
      return;
    }
    setError('');
    onStart({ company, role });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">{t('setup.title')}</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">{t('setup.subtitle')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('setup.form.companyLabel')}
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={t('setup.form.companyPlaceholder')}
            className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('setup.form.roleLabel')}
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder={t('setup.form.rolePlaceholder')}
            className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isLoading ? t('setup.form.buttonLoading') : t('setup.form.button')}
        </button>
      </form>
    </div>
  );
};

export default SetupForm;
