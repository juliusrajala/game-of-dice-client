import * as React from 'react';
import styled from 'styled-components';
import { useStoredUser, useRequestedData } from 'src/hooks/http';
import { getUser } from 'src/core/api';
import NewUserForm from 'src/components/NewUserForm';

// Yeah. Let's be honest, we're not even trying to be secure here.
// So if you read this. Don't use it as an inspiration for your
// customer facing application. This is only to provide a very thin
// layer of identity.

const UserPanel = () => {
  const userId = useStoredUser();
  if (!userId) {
    return (
      <UserContainer>
        <NewUserForm />
      </UserContainer>
    );
  }

  const [requestState] = useRequestedData<User>(
    getUser(userId, 'juliusrajala@gmail.com')
  );

  if (requestState.status === 'pending') {
    <UserContainer>Loading...</UserContainer>;
  }

  return <UserContainer>{requestState.data.user_name}</UserContainer>;
};

export default UserPanel;

const UserContainer = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  border-radius: 5px;
`;
