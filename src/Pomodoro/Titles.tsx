import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import TimersContext, { TimerName } from './TimersContext';

const FocusTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const FocusUnderline = () => {
  const { state } = useContext(TimersContext);

  return (
    <FocusTitleContainer>
      {Array.from({ length: state.pomodoroSet }).map((_, i) => (
        <Underline
          timer={state.activeTimer.name === 'focus' ? 'focus' : 'default'}
          active={i + 1 > state.pomodoros % state.pomodoroSet}
        />
      ))}
    </FocusTitleContainer>
  );
};

const Titles = () => (
  <TimersContext.Consumer>
    {(context) => (
      <Container>
        <section>
          <Title active={context.state.activeTimer.name === 'break'}>
            Break
          </Title>
          <Underline
            timer="break"
            active={context.state.activeTimer.name === 'break'}
          />
        </section>
        <section>
          <Title active={context.state.activeTimer.name === 'focus'}>
            focus
          </Title>
          <FocusUnderline />
          {/* <Underline
            timer="focus"
            active={context.state.activeTimer.name === 'focus'}
          /> */}
        </section>
        <section>
          <Title active={context.state.activeTimer.name === 'longBreak'}>
            Long Break
          </Title>
          <Underline
            timer="longBreak"
            active={context.state.activeTimer.name === 'longBreak'}
          />
        </section>
      </Container>
    )}
  </TimersContext.Consumer>
);

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
  font-family: 'Rubik';
  font-size: 1.5rem;
  font-weight: 700;
  display: inline-block;
  height: 45px;
  text-align: center;
  padding: 0.4em;
  position: relative;
  color: var(${(props) => (props.active ? '--light' : '--med')}grey);
`;

const Underline = styled.div<{ active: boolean; timer: TimerName | 'default' }>`
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: var(--${(props) =>
    props.active
      ? props.timer !== 'default'
        ? `light-${props.timer});`
        : 'medgrey);'
      : 'faintgrey);'}

`;
