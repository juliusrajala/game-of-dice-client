import * as React from 'react';
import styled from 'styled-components';
import { FiLock } from 'react-icons/fi';
import DiceControl from 'src/containers/Dice';
import EventTray from 'src/containers/Events';
import UserPanel from 'src/containers/Users';
import Rooms from 'src/containers/Rooms';
import { Users } from 'src/App';

export default () => {
  const userContext = React.useContext(Users);

  return (
    <>
      <MainPanel>
        <Logout onClick={userContext.logOut}>
          <FiLock />
          Log out
        </Logout>
        <Rooms />
        <UserPanel />
        <DiceControl />
      </MainPanel>
      <EventTray />
    </>
  );
};

const MainPanel = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: auto;
  align-self: flex-start;
  position: relative;
`;

const Logout = styled.button`
  font-size: 1rem;
  color: #fff;
  position: absolute;
  right: 0rem;
  top: -2rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  > svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: #bb3f3f;
  }
`;