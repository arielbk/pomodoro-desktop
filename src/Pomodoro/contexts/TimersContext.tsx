import { register } from "@tauri-apps/api/globalShortcut";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SoundType, useSounds } from "./SoundsContext";
import { useStats } from "./StatsContext";

const isDev = process.env.NODE_ENV === "development";

export type TimerName = "focus" | "break" | "longBreak";
export type TimerType = {
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
  timers: Record<TimerName, TimerType>;
  timerFunc: () => void;
  onTimerEnd: () => void;
  handlePlayPause: () => void;
  handleReset: () => void;
  handleSoundSelect: (timer: TimerName, newSound: any) => void;
  handleDurationChange: (timer: TimerName, newDuration: number) => void;
};

const TimersContext = createContext({} as TimersValues);

export const TimersProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [activeTimer, setActiveTimer] = useState({
    name: "focus" as TimerName,
    timeRemaining: 1500000,
    duration: 1500000,
    paused: true,
    untilTime: 0,
    intervalID: 0 as unknown as NodeJS.Timer,
  });

  const [timers, setTimers] = useState({
    focus: {
      duration: isDev ? 1500 : 1500000, // mseconds - 25 min default
      sound: "Triumph" as SoundType,
    } as TimerType,

    // BREAK TIMER
    break: {
      duration: isDev ? 300 : 300000, // mseconds - 5 min default
      sound: "Bell" as SoundType,
    } as TimerType,

    // LONG BREAK TIMER
    longBreak: {
      duration: isDev ? 900 : 900000, // mseconds - 15 min default
      sound: "Winning" as SoundType,
    } as TimerType,
  } as Record<TimerName, TimerType>);

  const { playSound } = useSounds();
  const { pomodoros, incrementPomodoros, pomodoroSet } = useStats();

  useEffect(() => {
    register("CommandOrControl+Alt+Enter", () => {
      playSound("LevelUp");
      handlePlayPause();
    });
  }, []);

  // timer function called every second while timer is on
  const timerFunc = () => {
    // make sure timer is set up
    if (!activeTimer.untilTime) return;

    // if timer ends
    if (activeTimer.timeRemaining < 250) {
      onTimerEnd();
      return;
    }

    // set new state
    setActiveTimer((prev) => ({
      ...prev,
      timeRemaining: Math.round(activeTimer.untilTime - Date.now()),
    }));
  };

  const onTimerEnd = async () => {
    const timer = { ...activeTimer };
    clearInterval(timer.intervalID);

    playSound(timers[activeTimer.name].sound);

    let nextTimer: TimerName;
    if (activeTimer.name === "focus") {
      incrementPomodoros();
      if (pomodoros % pomodoroSet === 0) {
        nextTimer = "longBreak";
      } else {
        nextTimer = "break";
      }
    } else {
      nextTimer = "focus";
    }

    timer.name = nextTimer;
    timer.duration = timers[nextTimer].duration;
    timer.timeRemaining = timers[nextTimer].duration;
    timer.paused = true;

    setActiveTimer(timer);
  };

  const handlePlayPause = () => {
    const timer = { ...activeTimer };

    timer.paused = !timer.paused;
    if (!timer.paused) timer.untilTime = Date.now() + timer.timeRemaining;

    setActiveTimer(timer);
  };

  useEffect(() => {
    console.log({ paused: activeTimer.paused });
    if (activeTimer.paused) {
      clearInterval(activeTimer.intervalID);
      return;
    }

    // if timer is not paused, start it
    const timer = { ...activeTimer };

    timer.intervalID = setInterval(timerFunc, 50);

    setActiveTimer(timer);
  }, [activeTimer.paused]);

  // default back to focus timer
  const handleReset = () => {
    const timer = { ...activeTimer };

    const { duration } = timers.focus;

    timer.name = "focus";
    timer.timeRemaining = duration;
    timer.duration = duration;
    timer.paused = true;

    setActiveTimer(timer);
  };

  const handleSoundSelect = (timerName: TimerName, sound: SoundType) => {
    // clone timer
    const timer = { ...timers[timerName] };
    timer.sound = sound;

    setTimers({ ...timers, [timerName]: timer });
  };

  const handleDurationChange = (timerName: TimerName, change: number) => {
    // clone timer and return if new duration is inappropriate
    const timer = { ...timers[timerName] };
    timer.duration += change * 60 * 1000; // from minutes to milliseconds
    if (timer.duration < 0 || timer.duration > 5940000) return; // 0 < timer < 99 minutes

    // set state
    setTimers({ ...timers, [timerName]: timer });
  };

  return (
    <TimersContext.Provider
      value={{
        activeTimer,
        timers,
        timerFunc,
        onTimerEnd,
        handlePlayPause,
        handleReset,
        handleSoundSelect,
        handleDurationChange,
      }}
    >
      {children}
    </TimersContext.Provider>
  );
};

export const useTimers = () => useContext(TimersContext);
