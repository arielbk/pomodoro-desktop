import { useStats } from "../contexts/StatsContext";
import { IncrementDecrement, SettingsItem } from "./Styles";

// settings component - set a pomodoro goal
const LongBreakSetter = () => {
  const { pomodoroSet, handlePomodoroSetChange } = useStats();
  return (
    <SettingsItem>
      <IncrementDecrement
        timer="longBreak"
        onMouseDown={() => handlePomodoroSetChange(pomodoroSet - 1)}
      >
        –
      </IncrementDecrement>

      <div>Every {pomodoroSet}</div>
      <IncrementDecrement
        timer="longBreak"
        onMouseDown={() => handlePomodoroSetChange(pomodoroSet + 1)}
      >
        +
      </IncrementDecrement>
    </SettingsItem>
  );
};

export default LongBreakSetter;
