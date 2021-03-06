import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import Footer from 'src/components/Footer';
import { useStoredUser } from 'src/hooks/storage';
import { getUser } from 'src/core/api';
import { SocketProvider } from 'src/context/socket';
import InputSwitch from 'src/components/InputSwitch';
import { Reset } from 'styled-reset';
import Router from 'src/core/Router';

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
  const [accMode, setAccMode] = React.useState(false);
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
      <SocketProvider>
        <Reset />
        <Page cssProps={{ accMode }}>
          <ContentWrapper>
            <Title>noppa.io</Title>
            <FocusWrapper>
              <InputSwitch
                label="Emphasize focus"
                toggle={() => setAccMode(!accMode)}
                isToggled={accMode}
              />
            </FocusWrapper>
            <Router />
          </ContentWrapper>
          <Footer />
        </Page>
      </SocketProvider>
    </Users.Provider>
  );
};

const ContentWrapper = styled.div`
  flex: 1;
  justify-content: center;
  display: flex;
  width: 100%;
  padding: 7rem 5rem;
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

    ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps.accMode
        ? `
          &:focus {
            transition: all 0s;
            outline: 5px solid #bb3f3f;
            outline-offset: 5px;
          }`
        : `
          &:focus {
            transition: all 0s;
            outline: 4px solid rgba(187, 63, 63, 0.5);
          }
    `}
  }
`;

const FocusWrapper = styled.div`
  position: absolute;
  right: 6rem;
  top: 1rem;
`;

const Title = styled.h1`
  font-family: Londrina Outline, Sans Serif;
  font-size: 2.5rem;
  color: #fff;
  position: absolute;
  left: 5rem;
  top: 1.5rem;
`;

ReactApp();
