import * as React from 'react';
import styled from 'styled-components';
import { postNewUser } from 'src/core/api';
import Input from 'src/components/Input';
import { FiUnlock } from 'react-icons/fi';

const NewUserForm = () => {
  const [credentials, setCredentials] = React.useState({ name: '', email: '' });

  const createUser = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    postNewUser(credentials.name, credentials.email);
  };

  return (
    <UserForm>
      <Input
        label="Name"
        onChange={(ev) =>
          setCredentials({ ...credentials, name: ev.target.value })
        }
        inputProps={{
          autoFocus: true,
        }}
      />
      <Input
        label="Email"
        onChange={(ev) =>
          setCredentials({ ...credentials, email: ev.target.value })
        }
      />
      <Button role="button" onClick={createUser}>
        <FiUnlock />
        Login
      </Button>
    </UserForm>
  );
};

export default NewUserForm;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: #bb3f3f;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  padding: 0.5rem;
  margin: 0.25rem;
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 150px;
  margin-top: 1rem;
  font-size: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  &:hover,
  &:focus {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
