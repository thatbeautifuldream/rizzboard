"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseAudioOptions {
  onEnded?: () => void;
}

interface UseAudioReturn {
  play: () => void;
  pause: () => void;
  stop: () => void;
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
}

export function useAudio(
  url: string,
  options: UseAudioOptions = {}
): UseAudioReturn {
  const { onEnded } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize audio element when URL changes
  useEffect(() => {
    if (!url) return;

    setIsLoading(true);
    setError(null);

    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = url;

    const handleReady = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setError("Failed to load audio");
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleReady);
    audio.addEventListener("canplay", handleReady);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("playing", handlePlay);
    audio.addEventListener("pause", handlePause);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("loadedmetadata", handleReady);
      audio.removeEventListener("canplay", handleReady);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("playing", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      // fully release the audio resource
      try {
        audio.src = "";
        audio.load();
      } catch {}
      audioRef.current = null;
    };
  }, [url, onEnded]);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    try {
      // Reset to beginning if audio has ended
      if (audioRef.current.ended) {
        audioRef.current.currentTime = 0;
      }

      void audioRef.current.play().catch((err) => {
        console.error("Audio play failed:", err);
        setError("Failed to play audio");
      });
    } catch (err) {
      console.error("Audio play failed:", err);
      setError("Failed to play audio");
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;

    try {
      audioRef.current.pause();
    } catch (err) {
      console.error("Audio pause failed:", err);
    }
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } catch (err) {
      console.error("Audio stop failed:", err);
    }
  }, []);

  return { play, pause, stop, isLoading, isPlaying, error };
}