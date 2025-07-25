
import React from 'react';
import { Story, Language } from '../types';

interface StoryCardProps {
  story: Story;
  language: Language;
  onSelect: (id: number) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, language, onSelect }) => {
  const content = story.content[language];

  return (
    <div
      onClick={() => onSelect(story.id)}
      className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
    >
      <img src={story.coverImage} alt={content.title} className="w-full h-64 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{content.title}</h3>
        <p className="text-gray-600 text-sm h-10">{content.description}</p>
        <button className="mt-4 w-full bg-orange-400 text-white font-bold py-3 rounded-xl hover:bg-orange-500 transition-colors duration-300 group-hover:scale-105 transform">
          Read Story
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
