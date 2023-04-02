// This component is passed state via a Context HOC (bottom)
// Context is accessed via props
// This should be a common HOC for reuse, still haven't figured it out completely
// And this still seems relatively clean...

import { useEffect } from "react";
import { IoMdPause, IoMdPlay, IoMdRefresh } from "react-icons/io";
import styled from "styled-components";
import { useTimers } from "./contexts/TimersContext";
import { TimerName } from "./TimersContext";

const ButtonProgress = () => {
  const { handlePlayPause, handleReset, activeTimer } = useTimers();

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);

    return () => document.removeEventListener("keyup", handleKeyPress);
  }, []);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === " ") {
      handlePlayPause();
    } else if (e.key === "Escape") {
      handleReset();
    }
  };
  const strokeDashoffset =
    Math.floor(
      10 * ((activeTimer.timeRemaining / activeTimer.duration) * 395.8)
    ) / 10;

  return (
    <ButtonsContainer>
      <StyledButtonProgress timer={activeTimer.name} onClick={handlePlayPause}>
        <ProgressCircle timer={activeTimer.name}>
          <circle r="63" strokeDashoffset={strokeDashoffset} />
        </ProgressCircle>
        <ButtonProgressInner
          paused={activeTimer.paused}
          timer={activeTimer.name}
        >
          {activeTimer.paused ? <IoMdPlay /> : <IoMdPause />}
        </ButtonProgressInner>
      </StyledButtonProgress>
      <ResetButton onClick={handleReset}>
        <IoMdRefresh />
      </ResetButton>
    </ButtonsContainer>
  );
};

export default ButtonProgress;

const ButtonsContainer = styled.button`
  background: transparent;
  border: none;
  position: relative;
  width: 150px;
  height: 150px;
`;

const ResetButton = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 40px;
  font-weight: 900;
  color: var(--medgrey);

  &:hover {
    color: var(--light-focus);
    cursor: pointer;
  }
`;

const StyledButtonProgress = styled.button<{ timer: TimerName }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;

  width: 140px;
  height: 140px;
  font-size: 64px;
  border-radius: 50%;
  background: var(--faintgrey);

  &:hover {
    cursor: pointer;
  }
`;

const ButtonProgressInner = styled.button<{
  timer: TimerName;
  paused: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;

  background: var(--darkgrey);
  color: ${(props) => "var(--light-" + props.timer});
  width: 112px;
  height: 112px;
  border-radius: 100%;
  font-size: 1em;
  & {
    ${(props) => props.paused && "padding-left: 14px;"}
  }
`;

const ProgressCircle = styled.svg<{ timer: TimerName }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 140px;
  height: 140px;
  fill: transparent;

  & circle {
    stroke:  ${(props) => "var(--light-" + props.timer});
    stroke-width: 14;
    cx: 70;
    cy: 70;
  }

  // circumference = 63 * 2 * PI = 395.8

  transition: 1s;
  stroke-dasharray: 395.8 395.8;
  stroke-linecap: round;
  transform: rotate(-90deg);
`;
