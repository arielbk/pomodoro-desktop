import React, { createContext, useContext, useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";

interface StatsValues {
  pomodoros: number;
  goal: number;
  pomodoroSet: number;
  handleGoalChange: (newGoal: number) => void;
  handlePomodoroSetChange: (newPomodoroSet: number) => void;
  incrementPomodoros: () => void;
}

const isDev = process.env.NODE_ENV === "development";

export const StatsContext = createContext({} as StatsValues);

// local pomodoros store
const store = new Store(".pomodori.dat");

export const StatsProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [pomodoros, setPomodoros] = useState(0);
  const [goal, setGoal] = useState(8);
  const [pomodoroSet, setPomodoroSet] = useState(4);

  const handleGoalChange = (newGoal: number) => {
    setGoal(newGoal);
  };
  const handlePomodoroSetChange = (newPomodoroSet: number) => {
    setPomodoroSet(newPomodoroSet);
  };
  const incrementPomodoros = () => {
    setPomodoros((prev) => prev + 1);
  };

  const getStoredPomodoros = async () => {
    const todayKey = new Date().toDateString();
    const stored = await store.get(todayKey);
    if (!stored) return;
    setPomodoros(typeof stored === "number" ? stored : 0);
  };

  const setStoredPomodoros = async () => {
    const todayKey = new Date().toDateString();
    await store.set(todayKey, isDev ? 0 : pomodoros);
  };

  useEffect(() => {
    getStoredPomodoros();
  }, []);

  useEffect(() => {
    setStoredPomodoros();
  }, [pomodoros]);

  return (
    <StatsContext.Provider
      value={{
        pomodoros,
        goal,
        pomodoroSet,
        handleGoalChange,
        handlePomodoroSetChange,
        incrementPomodoros,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);
