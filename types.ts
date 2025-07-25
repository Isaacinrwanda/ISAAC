
import { ReactNode } from 'react';

export enum Language {
  Kinyarwanda = 'rw',
  English = 'en',
  French = 'fr',
}

export interface VocabularyItem {
  word: string;
  definition: string;
}

export interface StoryContent {
  title: string;
  description: string;
  text: string[];
  moral: string;
  vocabulary: VocabularyItem[];
}

export interface Story {
  id: number;
  content: {
    [Language.Kinyarwanda]: StoryContent;
    [Language.English]: StoryContent;
    [Language.French]: StoryContent;
  };
  coverImage: string;
  illustration: React.FC<{ className?: string; onClick?: () => void; }>;
}

export interface ReadingStat {
  storyId: number;
  timeSpent: number; // in seconds
  readCount: number;
}
