import * as React from 'react';
import styled from 'styled-components';
import { Users } from 'src/App';
import Characters from 'src/containers/Characters';
import AccentPicker from 'src/components/AccentPicker';
import { FiLock, FiSettings } from 'react-icons/fi';

// Yeah. Let's be honest, we're not even trying to be secure here.
// So if you read this. Don't use it as an inspiration for your
// customer facing application. This is only to provide a very thin
// layer of identity.

const UserPanel = () => {
  const [settingsOpen, toggleSettings] = React.useState(false);
  const userContext = React.useContext(Users);
  return (
    <UserContainer>
      <UserButtons>
        <UserButton onClick={() => userContext.logOut()}>
          <FiLock />
        </UserButton>
        <UserButton onClick={() => toggleSettings(!settingsOpen)}>
          <FiSettings />
        </UserButton>
      </UserButtons>
      {settingsOpen && <AccentPicker />}
      <Characters />
    </UserContainer>
  );
};

export default UserPanel;

const UserContainer = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  border-radius: 5px;
  position: relative;
`;

const UserButtons = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const UserButton = styled.button`
  border: none;
  background: transparent;
  color: #3f3f3f:
  font-weight: 600;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    color: #bb3f3f;
  }
`;
