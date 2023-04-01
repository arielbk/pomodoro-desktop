import styled from "styled-components";
import { useStats } from "./contexts/StatsContext";

// displays pomodoros completed and pomodoro goal
export default function Counters() {
  const { pomodoros, goal } = useStats();
  return (
    <span>
      <Pomodoros>{pomodoros}</Pomodoros>
      <Group>
        <Goal>of {goal}</Goal>
        <Text>
          pomodori
          <br /> today
        </Text>
      </Group>
    </span>
  );
}

const Pomodoros = styled.div`
  display: inline-block;
  font-size: 6em;
  color: #999;
  font-weight: 200;
  letter-spacing: -0.05em;
`;

const Group = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const Goal = styled.div`
  font-size: 2.5em;
  text-align: right;
  color: var(--medgrey);
`;

const Text = styled.div`
  font-size: 0.9em;
  text-align: right;
`;
