
import { useCallback, useEffect, useRef } from 'react';
import { ReadingStat } from '../types';

const STATS_KEY = 'inkurunziza_reading_stats';

const getStats = (): ReadingStat[] => {
  try {
    const statsJson = localStorage.getItem(STATS_KEY);
    return statsJson ? JSON.parse(statsJson) : [];
  } catch (error) {
    console.error("Error reading stats from localStorage", error);
    return [];
  }
};

const saveStats = (stats: ReadingStat[]) => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Error saving stats to localStorage", error);
  }
};

export const useTracking = () => {
  const intervalRef = useRef<number | null>(null);

  const startTracking = useCallback((storyId: number) => {
    // Stop any existing tracking
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Increment read count immediately
    const stats = getStats();
    const storyStat = stats.find(s => s.storyId === storyId);
    if (storyStat) {
      storyStat.readCount += 1;
    } else {
      stats.push({ storyId, timeSpent: 0, readCount: 1 });
    }
    saveStats(stats);
    
    // Start tracking time spent
    intervalRef.current = window.setInterval(() => {
      const currentStats = getStats();
      const currentStoryStat = currentStats.find(s => s.storyId === storyId);
      if (currentStoryStat) {
        currentStoryStat.timeSpent += 1;
        saveStats(currentStats);
      }
    }, 1000);
  }, []);

  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return { startTracking, stopTracking, getStats };
};
