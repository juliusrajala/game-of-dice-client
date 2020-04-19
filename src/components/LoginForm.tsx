import * as React from 'react';
import styled from 'styled-components';
import { postNewUser, loginUser } from 'src/core/api';
import Input from 'src/components/Input';
import { FiUnlock, FiUserPlus } from 'react-icons/fi';
import Button from 'src/components/Button';
import { Users } from 'src/App';
import { Redirect } from 'react-router';

const LoginForm = () => {
  const userContext = React.useContext(Users);
  const [credentials, setCredentials] = React.useState({ name: '', email: '' });
  const [errorState, setError] = React.useState(null);

  const onCreateUser = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    return postNewUser(credentials.name, credentials.email)
      .then((user: User) => userContext.setUser(user))
      .catch((err: Error) => {
        console.error(err);
        setError(err.message);
      });
  };

  const onLoginUser = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    return loginUser(credentials.name, credentials.email)
      .then((user: User) => {
        if (user) {
          return userContext.setUser(user);
        }
      })
      .catch((err: Error) => {
        console.error('Login errored', err);
        setError(err.message);
      });
  };

  console.log('User context', userContext);

  if (userContext.user) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <LoginModal>
      <LoginText>Log in</LoginText>
      <p>
        This isn't an actual login in the sense that it's not even trying to be
        secure. The same form is used for both account creation and login.
      </p>
      <p>The email is for future account recovery.</p>

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
        <FormActions>
          <Button
            onClick={(ev) => onLoginUser(ev)}
            label={
              <>
                <FiUnlock />
                Login
              </>
            }
          />
          <Button
            onClick={(ev) => onCreateUser(ev)}
            label={
              <>
                <FiUserPlus />
                Create user
              </>
            }
          />
        </FormActions>
      </UserForm>
      {errorState && (
        <p>
          <b>Error happened:</b> {JSON.stringify(errorState)}
        </p>
      )}
    </LoginModal>
  );
};

export default LoginForm;

const LoginModal = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  border-radius: 5px;
  width: 300px;
  max-height: 500px;

  > p {
    padding: 1rem 0rem;
  }
`;

const LoginText = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
`;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: row;

  > button {
    width: 120px;
  }
`;
