
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StoryCard from './components/StoryCard';
import StoryView from './components/StoryView';
import ParentDashboard from './components/ParentDashboard';
import { Language, Story } from './types';
import { STORIES } from './constants';
import { BellIcon, XIcon } from './components/icons';

const App: React.FC = () => {
  type View = 'library' | 'story' | 'dashboard';
  const [currentView, setCurrentView] = useState<View>('library');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [language, setLanguage] = useState<Language>(Language.English);
  const [showNotification, setShowNotification] = useState(true);

  const handleSelectStory = (id: number) => {
    const story = STORIES.find(s => s.id === id);
    if (story) {
      setSelectedStory(story);
      setCurrentView('story');
    }
  };

  const handleBack = () => {
    setSelectedStory(null);
    setCurrentView('library');
  };

  const handleNavigate = (view: 'library' | 'dashboard') => {
    setSelectedStory(null);
    setCurrentView(view);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowNotification(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [])
  

  const renderContent = () => {
    switch (currentView) {
      case 'story':
        return selectedStory ? <StoryView story={selectedStory} language={language} onBack={handleBack} /> : null;
      case 'dashboard':
        return <ParentDashboard language={language}/>;
      case 'library':
      default:
        return (
          <div className="container mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {STORIES.map(story => (
                <StoryCard key={story.id} story={story} language={language} onSelect={handleSelectStory} />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-yellow-50 to-green-100">
      <Header currentView={currentView === 'dashboard' ? 'dashboard' : 'library'} onNavigate={handleNavigate} language={language} onLanguageChange={setLanguage}/>
      <main>
        {renderContent()}
      </main>

      {showNotification && (
        <div className="fixed bottom-4 right-4 max-w-sm w-full bg-white rounded-2xl shadow-2xl p-4 flex items-start gap-4 animate-notification-slide-in z-50">
            <div className="bg-yellow-400 p-3 rounded-full">
                <BellIcon className="h-6 w-6 text-yellow-800" />
            </div>
            <div>
                <h4 className="font-bold text-gray-800">Your daily story is here!</h4>
                <p className="text-sm text-gray-600">Discover a new adventure today and keep learning.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <XIcon className="w-5 h-5"/>
            </button>
        </div>
      )}
    </div>
  );
};

export default App;
