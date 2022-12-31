import React from 'react';
import PropTypes from 'prop-types';
import TimersContext from '../TimersContext';
import { SettingsItem, IncrementDecrement } from './Styles';

// settings component - set a time
const TimeSetter = (props) => {
  const { timerName } = props;
  return (
    <TimersContext.Consumer>
      {context => (
        <SettingsItem>
          <IncrementDecrement
            timer={timerName}
            onMouseDown={() => context.handleDurationChange(timerName, -1)}
          >
            –
          </IncrementDecrement>

          <div>
            {Math.floor(context.state[timerName].duration / 60 / 1000)}
            {' '}
            min
          </div>

          <IncrementDecrement
            timer={timerName}
            onMouseDown={() => context.handleDurationChange(timerName, 1)}
          >
            +
          </IncrementDecrement>
        </SettingsItem>
      )}
    </TimersContext.Consumer>
  );
};

export default TimeSetter;

TimeSetter.propTypes = {
  timerName: PropTypes.string.isRequired,
};
