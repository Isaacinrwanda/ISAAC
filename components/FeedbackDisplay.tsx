
import React, { useContext } from 'react';
import type { FeedbackReport } from '../types';
import { LanguageContext } from '../contexts/LanguageContext';

interface FeedbackDisplayProps {
  report: FeedbackReport;
  onRestart: () => void;
}

const FeedbackCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 animate-slide-in-up">
        <h3 className="text-xl font-bold text-brand-primary dark:text-brand-light mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{children}</p>
    </div>
);

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const size = 150;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Start the animation from a 0 score
  const [displayScore, setDisplayScore] = React.useState(0);
  
  React.useEffect(() => {
      const animation = requestAnimationFrame(() => setDisplayScore(score));
      return () => cancelAnimationFrame(animation);
  }, [score]);

  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200 dark:text-gray-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-brand-primary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-gray-800 dark:text-white">{displayScore}</span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/ 100</span>
      </div>
    </div>
  );
};


const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ report, onRestart }) => {
  const { t } = useContext(LanguageContext);
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">{t('feedback.title')}</h2>
        
        <div className="flex flex-col items-center justify-center mb-10 animate-slide-in-up">
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">{t('feedback.scoreTitle')}</h3>
            <ScoreCircle score={report.score} />
        </div>

        <div className="space-y-6">
             <FeedbackCard title={t('feedback.rationale')}>
                {report.scoreRationale}
            </FeedbackCard>
            <FeedbackCard title={t('feedback.overall')}>
                {report.overallAssessment}
            </FeedbackCard>
             <FeedbackCard title={t('feedback.strengths')}>
                {report.keyStrengths}
            </FeedbackCard>
             <FeedbackCard title={t('feedback.improvements')}>
                {report.areasForImprovement}
            </FeedbackCard>
        </div>
        <div className="text-center mt-10">
            <button
                onClick={onRestart}
                className="px-8 py-3 text-lg font-medium text-white bg-brand-primary hover:bg-brand-dark rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105"
            >
                {t('feedback.restartButton')}
            </button>
        </div>
    </div>
  );
};

export default FeedbackDisplay;