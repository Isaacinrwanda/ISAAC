
import React, { useState, useCallback, useRef, useContext } from 'react';
import { Chat } from '@google/genai';
import { InterviewState } from './types';
import type { ChatMessage, FeedbackReport, InterviewConfig } from './types';
import { createChatSession } from './services/geminiService';
import { LanguageContext } from './contexts/LanguageContext';

import CoverPage from './components/CoverPage';
import SetupForm from './components/SetupForm';
import ChatWindow from './components/ChatWindow';
import FeedbackDisplay from './components/FeedbackDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import LanguageSwitcher from './components/LanguageSwitcher';

const App: React.FC = () => {
  const [interviewState, setInterviewState] = useState<InterviewState>(InterviewState.COVER_PAGE);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackReport | null>(null);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const { locale, t } = useContext(LanguageContext);

  const handleProceedFromCover = () => {
    setInterviewState(InterviewState.SETUP);
  };

  const handleStartInterview = useCallback(async (config: InterviewConfig) => {
    setIsLoading(true);
    setError(null);
    setChatHistory([]);

    try {
      chatSessionRef.current = createChatSession(config, locale);
      setInterviewState(InterviewState.INTERVIEWING);

      const responseStream = await chatSessionRef.current.sendMessageStream({ message: 'Hello' });
      
      let fullResponse = '';
      setChatHistory(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullResponse += chunk.text;
          setChatHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = { role: 'model', content: fullResponse };
            return newHistory;
          });
        }
      }
      
    } catch (e) {
      console.error(e);
      setError(t('error.start'));
      setInterviewState(InterviewState.ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [locale, t]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chatSessionRef.current) return;
    
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const responseStream = await chatSessionRef.current.sendMessageStream({ message });
      
      let fullResponse = '';
      setChatHistory(prev => [...prev, { role: 'model', content: '' }]);
      
      for await (const chunk of responseStream) {
         if (chunk.text) {
          fullResponse += chunk.text;
          setChatHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = { role: 'model', content: fullResponse };
            return newHistory;
          });
        }
      }

    } catch (e) {
      console.error(e);
      setError(t('error.sendMessage'));
      setInterviewState(InterviewState.ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleEndInterview = useCallback(async () => {
    if (!chatSessionRef.current) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await chatSessionRef.current.sendMessage({ message: 'END_INTERVIEW' });
      const feedbackText = response.text;
      
      const parsedFeedback: FeedbackReport = JSON.parse(feedbackText);
      setFeedback(parsedFeedback);
      setInterviewState(InterviewState.FEEDBACK);

    } catch (e) {
      console.error(e);
      setError(t('error.end'));
      setInterviewState(InterviewState.ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [t]);
  
  const handleRestart = () => {
    setInterviewState(InterviewState.SETUP);
    setChatHistory([]);
    setFeedback(null);
    setError(null);
    chatSessionRef.current = null;
  }

  const renderContent = () => {
    switch (interviewState) {
      case InterviewState.COVER_PAGE:
        return <CoverPage onProceed={handleProceedFromCover} />;
      case InterviewState.SETUP:
        return <SetupForm onStart={handleStartInterview} isLoading={isLoading} />;
      case InterviewState.INTERVIEWING:
        return <ChatWindow messages={chatHistory} onSendMessage={handleSendMessage} onEndInterview={handleEndInterview} onRestart={handleRestart} isLoading={isLoading} />;
      case InterviewState.FEEDBACK:
        return feedback ? <FeedbackDisplay report={feedback} onRestart={handleRestart}/> : <LoadingSpinner/>;
      case InterviewState.ERROR:
        return (
          <div className="text-center p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{t('error.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <button
                onClick={handleRestart}
                className="px-6 py-2 text-md font-medium text-white bg-brand-primary hover:bg-brand-dark rounded-lg shadow-md"
            >
                {t('error.restartButton')}
            </button>
          </div>
        );
      default:
        return <SetupForm onStart={handleStartInterview} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary opacity-10 dark:opacity-20 z-0"></div>
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 w-full">
         {renderContent()}
      </div>
    </div>
  );
};

export default App;
