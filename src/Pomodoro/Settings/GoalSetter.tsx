import React from "react";
import { useStats } from "../contexts/StatsContext";
import TimersContext from "../TimersContext";
import { SettingsItem, IncrementDecrement } from "./Styles";

// settings component - set a pomodoro goal
const GoalSetter = () => {
  const { goal, handleGoalChange } = useStats();
  return (
    <SettingsItem>
      <IncrementDecrement
        timer="focus"
        onMouseDown={() => handleGoalChange(goal - 1)}
      >
        –
      </IncrementDecrement>
      <div>Goal : {goal}</div>
      <IncrementDecrement
        timer="focus"
        onMouseDown={() => handleGoalChange(goal + 1)}
      >
        +
      </IncrementDecrement>
    </SettingsItem>
  );
};

export default GoalSetter;
