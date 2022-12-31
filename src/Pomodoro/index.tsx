import React, { Fragment } from 'react';
import styled from 'styled-components';
import { TimersProvider } from './TimersContext';

import Toggle from '../Utilities/Toggle';
import Modal from '../Elements/Modal';

import ButtonProgress from './ButtonProgress';
import Settings from './Settings';
import ShowTime from './ShowTime';
import Counters from './Counters';
import About from './About';
import Titles from './Titles';


const View = () => (
  <TimersProvider>
    <App>
      <MainHeader>Pomodoro Timer</MainHeader>
      <Divider />
      <MainContent>

        {/* actual (non-styled) components */}
        <ButtonProgress />
        <ShowTime />
        <Counters />

      </MainContent>

      <Titles />

      <Toggle>
        {({ on, toggle }) => (
          <Fragment>
            <AboutToggle onClick={toggle}>
              <i className="fas fa-question" />
            </AboutToggle>
            <Modal toggle={toggle} on={on} from="left">
              <About />
            </Modal>
          </Fragment>
        )}
      </Toggle>

      <Toggle>
        {({ on, toggle }) => (
          <Fragment>
            <SettingsToggle onClick={toggle}>
              <i className="fas fa-cog" />
            </SettingsToggle>
            <Modal toggle={toggle} on={on} from="right">
              <Settings />
            </Modal>
          </Fragment>
        )}
      </Toggle>

    </App>
  </TimersProvider>
);

export default View;

const App = styled.div`
  position: relative;
  max-width: 940px;
  background: var(--darkgrey);
  box-shadow: 0 12px 50px rgba(0,0,0,.6);
  border-radius: 5px;
  margin: 30px auto 60px auto;
  padding: 40px 60px 80px 60px;

  @media (max-width: 780px) {
    margin: 0;
    padding: 20px 25px 40px 25px;
  }
`;

const MainHeader = styled.h1`
  font-size: 3.6em;
  text-align: center;
  margin: 0;
`;

const Divider = styled.div`
  height: 5px;
  width: 100%;
  background: var(--medgrey);
  border-radius: 5px;
  margin: 20px 0;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 60px 0;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    margin: 50px 0 40px 0;
  }
`;

const StyledToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 1.5em;
  background: var(--medgrey);
  color: var(--darkgrey);
  padding: .2em;
  border-radius: 50%;
  width: 48px;
  height: 48px;

  &:hover {
    cursor: pointer;
    background: var(--lightgrey);
  }

  i {
    font-size: 2rem;
  }
`;
const AboutToggle = styled(StyledToggle)`
  left: 2em;
`;
const SettingsToggle = styled(StyledToggle)`
  right: 2em;
`;
