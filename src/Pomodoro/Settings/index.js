import React from 'react';

import {
  Container, Title, Group, Content,
} from './Styles';

import GoalSetter from './GoalSetter';
import LongBreakSetter from './LongBreakSetter';
import SoundSetter from './SoundSetter';
import TimeSetter from './TimeSetter';

// container and title for timers' settings component
const Settings = () => (
  <Container>

    <Group timer="work">
      <Title timer="work">Work</Title>
      <Content>
        <TimeSetter timerName="work" />
        <SoundSetter timerName="work" />
        <GoalSetter timerName="work" />
      </Content>
    </Group>

    <Group timer="break">
      <Title timer="break">Break</Title>
      <Content>
        <TimeSetter timerName="break" />
        <SoundSetter timerName="break" />
      </Content>
    </Group>

    <Group timer="longBreak">
      <Title timer="longBreak">Long Break</Title>
      <Content>
        <TimeSetter timerName="longBreak" />
        <SoundSetter timerName="longBreak" />
        <LongBreakSetter timerName="longBreak" />
      </Content>
    </Group>

  </Container>
);

export default Settings;
