import React from "react";
import { useTimers } from "../contexts/TimersContext";
import { TimerName } from "../TimersContext";
import { IncrementDecrement, SettingsItem } from "./Styles";

interface Props {
  timerName: TimerName;
}

const TimeSetter: React.FC<Props> = ({ timerName }) => {
  const { timers, handleDurationChange } = useTimers();
  return (
    <SettingsItem>
      <IncrementDecrement
        timer={timerName}
        onMouseDown={() => handleDurationChange(timerName, -1)}
      >
        –
      </IncrementDecrement>

      <div>{Math.floor(timers[timerName].duration / 60 / 1000)} min</div>

      <IncrementDecrement
        timer={timerName}
        onMouseDown={() => handleDurationChange(timerName, 1)}
      >
        +
      </IncrementDecrement>
    </SettingsItem>
  );
};

export default TimeSetter;
