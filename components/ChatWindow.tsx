
import React, { useState, useRef, useEffect, useContext } from 'react';
import type { ChatMessage } from '../types';
import { UserIcon, RobotIcon, SendIcon } from './icons';
import LoadingSpinner from './LoadingSpinner';
import { LanguageContext } from '../contexts/LanguageContext';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onEndInterview: () => void;
  onRestart: () => void;
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onEndInterview, onRestart, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useContext(LanguageContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[80vh] bg-white dark:bg-gray-800 shadow-2xl rounded-2xl flex flex-col animate-fade-in">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('chat.title')}</h2>
        <div className="flex items-center space-x-2">
            <button
                onClick={onRestart}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                {t('chat.backButton')}
            </button>
            <button
                onClick={onEndInterview}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {t('chat.endButton')}
            </button>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 animate-slide-in-up ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center">
                <RobotIcon className="w-6 h-6" />
              </div>
            )}
            <div
              className={`max-w-md lg:max-w-lg p-4 rounded-2xl whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-brand-primary text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
             {msg.role === 'user' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white flex items-center justify-center">
                <UserIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center">
                <RobotIcon className="w-6 h-6" />
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-2xl rounded-bl-none">
                <LoadingSpinner />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.inputPlaceholder')}
            disabled={isLoading}
            className="flex-1 bg-transparent p-3 text-gray-800 dark:text-white focus:outline-none"
          />
          <button onClick={handleSend} disabled={isLoading} className="p-2 text-brand-primary hover:text-brand-dark disabled:text-gray-400 disabled:cursor-not-allowed">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatWindow;
