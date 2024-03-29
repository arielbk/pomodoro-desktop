import { invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TimerName, useTimers } from "./contexts/TimersContext";

const getMins = (time: number) =>
  String(Math.floor(time / 1000 / 60)).padStart(2, "0");
const getSecs = (time: number) =>
  String(Math.floor((time / 1000) % 60)).padStart(2, "0");
const getMsecs = (time: number) => String(Math.floor((time % 1000) / 100));

// displays the timer's current time formatted
const ShowTime: React.FC = () => {
  const { activeTimer } = useTimers();
  const { timeRemaining } = activeTimer;

  const [mins, setMins] = useState(getMins(timeRemaining));
  const [secs, setSecs] = useState(getSecs(timeRemaining));
  const [msecs, setMsecs] = useState(getMsecs(timeRemaining));

  useEffect(() => {
    setMins(getMins(timeRemaining));
    setSecs(getSecs(timeRemaining));
    setMsecs(getMsecs(timeRemaining));
  }, [timeRemaining]);

  useEffect(() => {
    // send time string to tauri rust side
    invoke("set_time", {
      time: `${mins}:${secs}`,
      timer: activeTimer.name,
    });
  }, [secs]);

  return (
    <Container>
      <Minutes timer={activeTimer.name}>{mins}</Minutes>
      <Group>
        <Seconds timer={activeTimer.name}>{secs}</Seconds>
        <Milliseconds>{msecs}</Milliseconds>
      </Group>
    </Container>
  );
};

export default ShowTime;

const Container = styled.span`
  // font-family: 'Rubik';
`;

// this needs to change depending on the timer we are on... COLOUR!
const Minutes = styled.div<{ timer: TimerName }>`
  display: inline-block;
  font-size: 7.2em;
  letter-spacing: -0.05em;
  color: var(${(props) => "--light-" + props.timer});
`;

const Group = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const Seconds = styled.div<{ timer: TimerName }>`
  font-size: 3.2em;
  color: #999;
  text-align: right;
`;

const Milliseconds = styled.div`
  font-size: 1.6em;
  text-align: right;
`;
