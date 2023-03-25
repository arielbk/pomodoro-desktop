import React, { createContext, useContext, useEffect, useState } from "react";

const audioCtx = new AudioContext();

async function loadSound(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(buffer);
  return audioBuffer;
}

export type TimerName = "focus" | "break" | "longBreak";
export type SoundType = "Bell" | "Triumph" | "LevelUp" | "Winning";

interface SoundsValues {
  sounds: SoundType[];
  playSound: (sound: SoundType) => void;
}

const SoundsContext = createContext({} as SoundsValues);

export const SoundsProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const sounds = ["Bell", "Triumph", "LevelUp", "Winning"] as SoundType[];
  const [buffers, setBuffers] = useState<Record<SoundType, AudioBuffer>>();

  useEffect(() => {
    const loadSounds = async () => {
      const Bell = await loadSound("/sounds/bell.mp3");
      const LevelUp = await loadSound("/sounds/levelup.mp3");
      const Triumph = await loadSound("/sounds/triumph.mp3");
      const Winning = await loadSound("/sounds/winning.mp3");
      setBuffers({
        Bell,
        LevelUp,
        Triumph,
        Winning,
      });
    };
    loadSounds();
  }, []);

  const playSound = async (sound: SoundType) => {
    if (!buffers) return;
    // ensure we are in a resumed state
    await audioCtx.resume();
    // create a buffer source for audio
    const source = audioCtx.createBufferSource();
    // connect to destination
    source.connect(audioCtx.destination);
    // assign loaded buffer
    source.buffer = buffers[sound];
    // play immediately from the top
    source.start(0);
  };

  return (
    <SoundsContext.Provider value={{ sounds, playSound }}>
      {children}
    </SoundsContext.Provider>
  );
};

export const useSounds = () => useContext(SoundsContext);
