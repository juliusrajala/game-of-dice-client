import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import Footer from 'src/components/Footer';
import DiceControl from 'src/containers/Dice';
import EventTray from 'src/containers/Events';
import UserPanel from 'src/containers/Users';
import { useStoredUser } from 'src/hooks/storage';
import { getUser } from 'src/core/api';
import NewUserForm from './components/UserForm';
import { FiLock } from 'react-icons/fi';

const ReactApp = () => {
  return ReactDOM.render(<App />, document.getElementById('react-root'));
};

interface UserContext {
  user: User | null;
  setUser?: (user: User) => void;
  logOut?: () => void;
}

export const Users = React.createContext<UserContext>({
  user: null,
});

const App: React.SFC<any> = () => {
  const [user, setUser] = React.useState<User>(null);

  const userId = useStoredUser();

  React.useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((user: User) => setUser(user))
        .catch((err) => console.error('Error:', err));
    }
  }, [userId]);

  const logOut = () => {
    localStorage.removeItem('godUserId');
    setUser(null);
  };

  return (
    <Users.Provider
      value={{
        user,
        setUser,
        logOut,
      }}
    >
      <Page>
        <ContentWrapper>
          <Title>noppa.io</Title>
          {!user ? (
            <NewUserForm />
          ) : (
            <>
              <Logout onClick={logOut}>
                <FiLock />
                Log out
              </Logout>
              <MainPanel>
                <UserPanel />
                <DiceControl />
              </MainPanel>
              <EventTray />
            </>
          )}
        </ContentWrapper>
        <Footer />
      </Page>
    </Users.Provider>
  );
};

const ContentWrapper = styled.div`
  flex: 1;
  justify-content: center;
  display: flex;
  width: 100%;
  padding: 5rem;
  flex-direction: row;
  position: relative;
  align-items: flex-start;
`;

const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: rgb(33, 71, 97);
  background: linear-gradient(
    170deg,
    rgba(33, 71, 97, 1) 24%,
    rgba(187, 63, 63, 1) 94%
  );
  * {
    font-family: 'Source Sans Pro', Helvetica, Arial;
  }
`;

const MainPanel = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: auto;
  align-self: flex-start;
`;

const Title = styled.h1`
  font-family: Londrina Outline, Sans Serif;
  font-size: 2.5rem;
  color: #fff;
  position: absolute;
  left: 5rem;
  top: 1.5rem;
`;

const Logout = styled.button`
  font-size: 1rem;
  color: #fff;
  position: absolute;
  right: 5rem;
  top: 3rem;
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

ReactApp();
