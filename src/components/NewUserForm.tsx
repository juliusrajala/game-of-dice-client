import * as React from 'react';
import styled from 'styled-components';
import { postNewUser } from 'src/core/api';

const NewUserForm = () => {
  const [credentials, setCredentials] = React.useState({ name: '', email: '' });

  const createUser = () => {
    postNewUser(credentials.name, credentials.email);
  };

  return (
    <UserForm>
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
    </UserForm>
  );
};

export default NewUserForm;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;
