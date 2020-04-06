import * as React from 'react';
import styled from 'styled-components';

// Yeah. Let's be honest, we're not even trying to be secure here.
// So if you read this. Don't use it as an inspiration for your
// customer facing application. This is only to provide a very thin
// layer of identity.

function useStoredUser() {
  const [storedUserId, setStoredUserId] = React.useState(null);
  React.useEffect(() => {
    const locallyStored = localStorage.getItem('godUserId');
    if (locallyStored) {
      setStoredUserId(locallyStored);
    }
  }, []);

  return storedUserId;
}

const UserPanel = () => {
  const userId = useStoredUser();
  if (!userId) {
    return <NewUserForm />;
  }

  return <div></div>;
};

const NewUserForm = () => {
  const [credentials, setCredentials] = React.useState({ name: '', email: '' });

  return (
    <UserContainer>
      <div>
        <label>
          <span>Name</span>
          <input
            onChange={(ev) =>
              setCredentials({ ...credentials, name: ev.target.value })
            }
          />
        </label>
        <label>
          <span>Email</span>
          <input
            onChange={(ev) =>
              setCredentials({ ...credentials, email: ev.target.value })
            }
          />
        </label>
      </div>
      <button>Login</button>
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
