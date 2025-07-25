
import React, { useEffect, useState } from 'react';
import { useTracking } from '../hooks/useTracking';
import { ReadingStat, Story, Language } from '../types';
import { STORIES } from '../constants';

interface ParentDashboardProps {
  language: Language;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ language }) => {
  const { getStats } = useTracking();
  const [stats, setStats] = useState<ReadingStat[]>([]);

  useEffect(() => {
    setStats(getStats());
  }, [getStats]);

  const totalReadingTime = stats.reduce((acc, stat) => acc + stat.timeSpent, 0);
  const totalStoriesRead = stats.reduce((acc, stat) => acc + stat.readCount, 0);

  const favoriteStories = [...stats]
    .sort((a, b) => b.readCount - a.readCount)
    .slice(0, 3)
    .map(stat => {
      const story = STORIES.find(s => s.id === stat.storyId);
      return story ? { ...stat, title: story.content[language].title } : null;
    })
    .filter(Boolean) as (ReadingStat & { title: string })[];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">Parent Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-500">Total Reading Time</h3>
          <p className="text-5xl font-bold text-green-500 mt-2">{formatTime(totalReadingTime)}</p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-500">Total Stories Read</h3>
          <p className="text-5xl font-bold text-orange-500 mt-2">{totalStoriesRead}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-purple-700 mb-6">Favorite Stories</h3>
        {favoriteStories.length > 0 ? (
          <div className="space-y-4">
            {favoriteStories.map((stat, index) => (
              <div key={stat.storyId} className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-500 w-10 text-center">{index + 1}</div>
                <div className="flex-grow">
                  <p className="font-bold text-lg text-gray-800">{stat.title}</p>
                  <p className="text-sm text-gray-500">Read {stat.readCount} times</p>
                </div>
                <div className="font-semibold text-gray-700">{formatTime(stat.timeSpent)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Start reading some stories to see your favorites here!</p>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
