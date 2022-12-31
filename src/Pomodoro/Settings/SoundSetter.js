import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TimersContext from '../TimersContext';
import { SettingsItem } from './Styles';

//  settings component - select a sound
const SoundSetter = (props) => {
  const { timerName } = props;
  return (
    <TimersContext>
      {context => (
        <StyledSoundSetter>

          <Arrow
            timer={timerName}
            onMouseDown={() => {
              let newIndex = context.state.sounds
                .indexOf(context.state[timerName].sound);
              if (newIndex === 0) {
                newIndex = context.state.sounds.length - 1;
              } else {
                newIndex -= 1;
              }
              context.handleSoundSelect(timerName, context.state.sounds[newIndex]);
            }}
          >
            &lt;
          </Arrow>

          <SoundList>
            {context.state.sounds.map(sound => (
              <li
                key={`${sound}`}
                hidden={sound !== context.state[timerName].sound}
              >
                <SoundIcon onClick={() => context.playSound(sound)}>
                  <i className="fas fa-volume-up" />
                </SoundIcon>
                {sound}
              </li>))}
          </SoundList>

          <Arrow
            timer={timerName}
            onMouseDown={() => {
              let newIndex = context.state.sounds
                .indexOf(context.state[timerName].sound);

              if (newIndex === context.state.sounds.length - 1) {
                newIndex = 0;
              } else {
                newIndex += 1;
              }

              context.handleSoundSelect(timerName, context.state.sounds[newIndex]);
            }}
          >
            &gt;
          </Arrow>

          <Progress>
            {context.state.sounds.map((sound, index) => (
              <ProgressTab
                onClick={() => context.handleSoundSelect(timerName, context.state.sounds[index])}
                key={`${sound}`}
                active={sound === context.state[timerName].sound}
                timer={timerName}
              />))}
          </Progress>

        </StyledSoundSetter>
      )}
    </TimersContext>
  );
};

export default SoundSetter;

SoundSetter.propTypes = {
  timerName: PropTypes.string.isRequired,
};

/* for some weird reason styled components won't let me *just* pass in SettingsItem component...
passing it as a callback works though */
const StyledSoundSetter = styled(props => <SettingsItem {...props} />)`
  flex-wrap: wrap;
  text-align: center;
  border-bottom: 1px solid var(--faintgrey);
  border-top: 1px solid var(--faintgrey);
  padding-bottom: 15px;
`;

const Arrow = styled.a`
  font-size: 2rem;
  color: var(--darkgrey);

  &:hover {
    cursor: pointer;
  }

  ${StyledSoundSetter}:hover & {
    color: var(--light-${props => props.timer});
  }
`;

const SoundIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background: var(--medgrey);
  padding: 2px;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  margin-right: .5em;
  position: absolute;
  left: 2em;

  ${StyledSoundSetter}:hover & {
    background: var(--lightgrey);
    cursor: pointer;
  }

  & i {
    font-size: .7em;
    color: var(--darkgrey);
  }
`;

const SoundList = styled.ul`
  margin: 0;
  padding: .5em;

  li {
    list-style: none;
    text-align: center;
    padding: .5em 0;

    &:hover {
      cursor: pointer;
      color: var(--lightgrey);
    }

    ${props => props.hidden && 'display: none'}
  }
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12px;
  border-radius: 6px;
  flex-basis: 100%;
  padding-bottom: 15px;
`;

const ProgressTab = styled.div`
  background: var(--medgrey);
  height: 13px;
  width: 13px;
  margin: 0 4px;
  border-radius: 100%;

  ${StyledSoundSetter}:hover & {
    ${props => props.active
      && `background: var(--light-${props.timer});`}
  }

  &:hover {
    cursor: pointer;
    background: var(--${props => (props.active ? 'light' : 'dark')}-${props => props.timer});
  }
`;
