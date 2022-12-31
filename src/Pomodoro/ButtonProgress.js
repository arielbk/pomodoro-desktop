// This component is passed state via a Context HOC (bottom)
// Context is accessed via props
// This should be a common HOC for reuse, still haven't figured it out completely
// And this still seems relatively clean...

import React, { Component } from 'react';
import styled from 'styled-components';
import TimersContext from './TimersContext';

class ButtonProgress extends Component {
  componentDidMount = () => {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    const { context } = this.props; // eslint-disable-line react/prop-types
    const { handlePlayPause, handleReset } = context;
    if (e.key === ' ') {
      handlePlayPause();
    } else if (e.key === 'Escape') {
      handleReset();
    }
  }

  render() {
    const { context } = this.props;
    return (
      <ButtonsContainer>
        <ResetButton onClick={context.handleReset}>✕</ResetButton>

        <StyledButtonProgress timer={context.state.activeTimer.name}>
          <ButtonProgressInner
            paused={context.state.activeTimer.paused}
            timer={context.state.activeTimer.name}
            onClick={context.handlePlayPause}
          >
            <i
              className={context.state.activeTimer.paused
                ? 'fas fa-play'
                : 'fas fa-pause'}
            />
          </ButtonProgressInner>
        </StyledButtonProgress>

        <ProgressCircle
          height="140"
          width="140"
          timer={context.state.activeTimer.name}
          progress={
            context.state.activeTimer.timeRemaining
              / context.state.activeTimer.duration
          }
        >
          <circle
            strokeDashoffset={Math.floor(10 * (
              context.state.activeTimer.timeRemaining
              / context.state.activeTimer.duration * 395.8))
              / 10}
          />
        </ProgressCircle>

      </ButtonsContainer>
    );
  }
}

const WithContext = () => (
  <TimersContext.Consumer>
    {context => <ButtonProgress context={context} />}
  </TimersContext.Consumer>
);

export default WithContext;

const ButtonsContainer = styled.div`
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

  &:hover {
    color: var(--light-work);
    cursor: pointer;
  }
`;

const StyledButtonProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 140px;
  height: 140px;
  font-size: 64px;
  border-radius: 50%;
  background: var(--dark-${props => props.timer});

  &:hover {
    cursor: pointer;
  }
  `;

const ButtonProgressInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: var(--darkgrey);
  color: var(--light-${props => props.timer});
  width: 112px;
  height: 112px;
  border-radius: 100%;
  font-size: 1em;
  & i {
    z-index:10;
    ${props => props.paused && 'padding-left: 12px'}
  }
`;

const ProgressCircle = styled.svg`
  position: absolute;
  left:0;
  top:0;

  & circle {
    z-index: 9;
    stroke: var(--light-${props => props.timer});
    stroke-width: 14;
    fill: transparent;
    r: 63;
    cx: 70;
    cy: 70;
  }

  // circumference = 63 * 2 * PI = 395.8

  transition: 1s;
  stroke-dasharray: 395.8 395.8;
  transform: rotate(-90deg);
`;
