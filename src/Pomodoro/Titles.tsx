import { useContext } from "react";
import styled from "styled-components";
import { useStats } from "./contexts/StatsContext";
import { TimerName, useTimers } from "./contexts/TimersContext";

const FocusTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const FocusUnderline = () => {
  const { activeTimer } = useTimers();
  const { pomodoros, pomodoroSet } = useStats();

  return (
    <FocusTitleContainer>
      {Array.from({ length: pomodoroSet }).map((_, i) => (
        <Underline
          timer={activeTimer.name === "focus" ? "focus" : "default"}
          active={i + 1 > pomodoros % pomodoroSet}
        />
      ))}
    </FocusTitleContainer>
  );
};

const Titles = () => {
  const { activeTimer } = useTimers();
  return (
    <Container>
      <section>
        <Title active={activeTimer.name === "break"}>Break</Title>
        <Underline timer="break" active={activeTimer.name === "break"} />
      </section>
      <section>
        <Title active={activeTimer.name === "focus"}>focus</Title>
        <FocusUnderline />
        {/* <Underline
            timer="focus"
            active={activeTimer.name === 'focus'}
          /> */}
      </section>
      <section>
        <Title active={activeTimer.name === "longBreak"}>Long Break</Title>
        <Underline
          timer="longBreak"
          active={activeTimer.name === "longBreak"}
        />
      </section>
    </Container>
  );
};

export default Titles;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }
`;

const Title = styled.div<{ active: boolean }>`
  text-transform: lowercase;
  font-family: "Rubik";
  font-size: 1.5rem;
  font-weight: 700;
  display: inline-block;
  height: 45px;
  text-align: center;
  padding: 0.4em;
  position: relative;
  color: var(${(props) => (props.active ? "--light" : "--med")}grey);
`;

const Underline = styled.div<{ active: boolean; timer: TimerName | "default" }>`
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: var(--${(props) =>
    props.active
      ? props.timer !== "default"
        ? `light-${props.timer});`
        : "medgrey);"
      : "faintgrey);"}

`;
