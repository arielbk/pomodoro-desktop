import "@fontsource/roboto";
import "@fontsource/rubik";
import { FaCog, FaQuestion } from "react-icons/fa";
import styled from "styled-components";
import About from "./About";
import ButtonProgress from "./ButtonProgress";
import { SoundsProvider } from "./contexts/SoundsContext";
import { StatsProvider } from "./contexts/StatsContext";
import { TimersProvider } from "./contexts/TimersContext";
import Counters from "./Counters";
import "./global.css";
import Modal from "./Modal";
import Settings from "./Settings";
import ShowTime from "./ShowTime";
import Titles from "./Titles";
import useToggle from "./useToggle";

//TODO: abstract into native windows

const View = () => {
  const [aboutOpen, toggleAboutOpen] = useToggle();
  const [settingsOpen, toggleSettingsOpen] = useToggle();
  return (
    <StatsProvider>
      <SoundsProvider>
        <TimersProvider>
          <Container>
            <MainContent>
              {/* actual (non-styled) components */}
              <ButtonProgress />
              <ShowTime />
              <Counters />
            </MainContent>

            <Titles />

            {/* <AboutToggle onClick={toggleAboutOpen}>
          <FaQuestion />
          </AboutToggle>
          <Modal toggle={toggleAboutOpen} on={aboutOpen} from="left">
          <About />
        </Modal> */}

            {/* <SettingsToggle onClick={toggleSettingsOpen}>
          <FaCog />
          </SettingsToggle>
          <Modal toggle={toggleSettingsOpen} on={settingsOpen} from="right">
          <Settings />
        </Modal> */}
          </Container>
        </TimersProvider>
      </SoundsProvider>
    </StatsProvider>
  );
};

export default View;

const Container = styled.div`
  scale: 0.5;
  transform-origin: 0 0;
  position: relative;
  width: 200vw;
  background: var(--darkgrey);
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  margin: auto;
  padding: 40px 60px 80px 60px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0 40px;
  gap: 2rem;
`;

const StyledToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 1.5em;
  background: var(--medgrey);
  color: var(--darkgrey);
  padding: 0.2em;
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
