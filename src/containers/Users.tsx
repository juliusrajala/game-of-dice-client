import * as React from 'react';
import styled from 'styled-components';
import { Users } from 'src/App';
import UserForm from 'src/components/UserForm';
import Characters from 'src/containers/Characters';

// Yeah. Let's be honest, we're not even trying to be secure here.
// So if you read this. Don't use it as an inspiration for your
// customer facing application. This is only to provide a very thin
// layer of identity.

const UserPanel = () => {
  const userContext = React.useContext(Users);
  return (
    <UserContainer>
      {userContext.user.user_name}
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
`;
