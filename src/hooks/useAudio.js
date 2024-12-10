import { useState, useEffect } from 'react';
import data from '../data'

const audio = new Audio(data.music);
audio.loop = true;

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const toggle = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, []);

  return { isPlaying, play, pause, toggle };
};