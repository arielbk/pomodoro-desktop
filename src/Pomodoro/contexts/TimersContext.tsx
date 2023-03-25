import React, { createContext, useContext, useState } from "react";
import { SoundType } from "./SoundsContext";

export type TimerName = "focus" | "break" | "longBreak";
export type TimerType = {
  name: TimerName;
  duration: number;
  sound: SoundType;
};

type TimersValues = {
  activeTimer: {
    name: TimerName;
    timeRemaining: number;
    duration: number;
    paused: boolean;
    untilTime: number;
    intervalID: NodeJS.Timer;
  };
  timerFunc: () => void;
  onTimerEnd: () => void;
  handlePlayPause: () => void;
  handleReset: () => void;
  handleSoundSelect: (timer: TimerName, newSound: any) => void;
  handleDurationChange: (timer: TimerName, newDuration: number) => void;
} & Record<TimerName, TimerType>;

const TimersContext = createContext({} as TimersValues);

export const TimerProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  return <TimersContext.Provider value={{}}>{children}</TimersContext.Provider>;
};

export const useTimers = () => useContext(TimersContext);
