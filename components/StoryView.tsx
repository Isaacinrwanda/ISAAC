
import React, { useState, useEffect, useMemo } from 'react';
import { Story, Language, VocabularyItem } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import { useTracking } from '../hooks/useTracking';
import { LANGUAGE_OPTIONS } from '../constants';
import { PlayIcon, PauseIcon, ChevronLeftIcon, LightbulbIcon, BookOpenIcon } from './icons';
import Modal from './Modal';

interface StoryViewProps {
  story: Story;
  language: Language;
  onBack: () => void;
}

const StoryView: React.FC<StoryViewProps> = ({ story, language, onBack }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isVocabOpen, setIsVocabOpen] = useState(false);
  const [isMoralOpen, setIsMoralOpen] = useState(false);

  const onBoundary = (charIndex: number) => {
    const textUpToBoundary = fullText.substring(0, charIndex);
    const wordCount = (textUpToBoundary.match(/\s/g) || []).length;
    setHighlightedIndex(wordCount);
  };

  const { play, cancel, isPlaying } = useSpeech(onBoundary);
  const { startTracking, stopTracking } = useTracking();

  const content = story.content[language];
  const fullText = useMemo(() => content.text.join(' '), [content.text]);
  const words = useMemo(() => fullText.split(/\s+/), [fullText]);

  useEffect(() => {
    startTracking(story.id);
    return () => {
      stopTracking();
      cancel();
    };
  }, [story.id, startTracking, stopTracking, cancel]);

  const handlePlayPause = () => {
    if (isPlaying) {
      cancel();
      setHighlightedIndex(-1);
    } else {
      play(fullText, language);
    }
  };
  
  useEffect(() => {
    if (!isPlaying) {
        setHighlightedIndex(-1);
    }
  }, [isPlaying])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <button onClick={() => { cancel(); onBack(); }} className="flex items-center gap-2 bg-white text-blue-600 font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-50 transition-colors mb-4">
        <ChevronLeftIcon className="w-6 h-6" />
        Back to Library
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">{content.title}</h2>
            <p className="text-gray-500 mb-6">{LANGUAGE_OPTIONS[language].label} Version</p>

            <div className="text-lg text-gray-800 leading-relaxed max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-xl">
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`transition-colors duration-200 ${index === highlightedIndex ? 'bg-yellow-300 rounded' : 'bg-transparent'}`}
                >
                  {word}{' '}
                </span>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <story.illustration className="w-full h-auto rounded-2xl shadow-lg cursor-pointer transform active:scale-95 transition-transform" onClick={() => alert("Interactive sound! ✨")}/>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={handlePlayPause}
            className="w-full sm:w-auto flex items-center justify-center gap-3 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105 text-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
          >
            {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
            <span>{isPlaying ? 'Pause' : 'Read Aloud'}</span>
          </button>
          <button 
            onClick={() => setIsVocabOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-purple-600 transition-colors"
          >
            <BookOpenIcon className="w-6 h-6"/>
            Learn Words
          </button>
          <button 
            onClick={() => setIsMoralOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-pink-600 transition-colors"
          >
            <LightbulbIcon className="w-6 h-6"/>
            Moral Lesson
          </button>
        </div>
      </div>

      <Modal isOpen={isVocabOpen} onClose={() => setIsVocabOpen(false)} title="Vocabulary">
        <ul className="space-y-4">
          {content.vocabulary.map((item, index) => (
            <li key={index} className="border-l-4 border-purple-400 pl-4">
              <p className="font-bold text-lg text-purple-800">{item.word}</p>
              <p className="text-gray-600">{item.definition}</p>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal isOpen={isMoralOpen} onClose={() => setIsMoralOpen(false)} title="The Moral of the Story">
        <div className="flex items-start gap-4">
            <LightbulbIcon className="w-12 h-12 text-pink-500 flex-shrink-0 mt-1" />
            <p className="text-xl text-gray-700 font-medium">"{content.moral}"</p>
        </div>
      </Modal>

    </div>
  );
};

export default StoryView;
