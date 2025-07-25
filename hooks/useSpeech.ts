
import { useState, useEffect, useCallback } from 'react';
import { Language } from '../types';

export const useSpeech = (onBoundary: (charIndex: number) => void) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const getVoice = (lang: Language) => {
    if (!isSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    const langCode = lang === 'rw' ? 'fr' : lang; // Use French voice for Kinyarwanda as a fallback
    
    // Prioritize voices that match the language and region
    let voice = voices.find(v => v.lang.startsWith(`${langCode}-`));
    // Fallback to a voice that just matches the language
    if (!voice) {
        voice = voices.find(v => v.lang === langCode);
    }
    return voice || null;
  };
  
  const play = useCallback((text: string, lang: Language) => {
    if (!isSupported || isPlaying) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoice(lang);
    if (voice) {
        utterance.voice = voice;
    }
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utterance.onboundary = (event) => {
        if(event.name === 'word'){
            onBoundary(event.charIndex);
        }
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isSupported, isPlaying, onBoundary]);

  const cancel = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [isSupported]);

  useEffect(() => {
    // Ensure voices are loaded
    if (isSupported) {
        window.speechSynthesis.onvoiceschanged = () => {
            // Voices loaded, can now get them.
        };
    }
    return () => {
        if(isSupported) {
            window.speechSynthesis.cancel();
        }
    };
  }, [isSupported]);
  
  return { play, cancel, isPlaying, isSupported };
};
