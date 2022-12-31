import React from 'react';
import styled from 'styled-components';
import TimersContext from './TimersContext';

// displays the timer's current time formatted
const ShowTime = (props) => {
  const { context } = props; // eslint-disable-line react/prop-types
  const { state } = context;

  const { timeRemaining } = state.activeTimer;

  let mins = Math.floor((timeRemaining / 1000) / 60);
  if (mins < 10) mins = `0${mins}`; // prepend 0 if < 10

  let secs = Math.floor((timeRemaining / 1000) % 60);
  if (secs < 10) secs = `0${secs}`; // prepend 0 if < 10

  let msecs = Math.floor(timeRemaining % 1000);
  if (msecs < 10) {
    msecs = `00${msecs}`;
  } else if (msecs < 100) {
    msecs = `0${msecs}`;
  }

  document.title = `${mins}:${secs} - pomodoro timer`;
  return (
    <Container>
      <Minutes timer={state.activeTimer.name}>{mins}</Minutes>
      <Group>
        <Seconds timer={state.activeTimer.name}>{secs}</Seconds>
        <Milliseconds>{msecs}</Milliseconds>
      </Group>
    </Container>
  );
};

const WithContext = () => (
  <TimersContext.Consumer>
    {context => <ShowTime context={context} />}
  </TimersContext.Consumer>
);

export default WithContext;

const Container = styled.span`
  // font-family: 'Rubik';
`;

// this needs to change depending on the timer we are on... COLOUR!
const Minutes = styled.div`
  display: inline-block;
  font-size: 7.2em;
  letter-spacing: -.05em;
  color: var(--light-${props => props.timer});
`;

const Group = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const Seconds = styled.div`
  font-size: 3.2em;;
  color: #999;
  text-align: right;
`;

const Milliseconds = styled.div`
  font-size: 1.6em;
  text-align: right;
`;
