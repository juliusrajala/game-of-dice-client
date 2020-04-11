import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import Footer from 'src/components/Footer';
import DiceControl from 'src/containers/Dice';
import EventTray from 'src/containers/Events';
import UserPanel from 'src/containers/Users';
import { useStoredUser } from 'src/hooks/storage';
import { getUser } from 'src/core/api';

const ReactApp = () => {
  return ReactDOM.render(<App />, document.getElementById('react-root'));
};

const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #214761;

  * {
    font-family: 'Source Sans Pro', Helvetica, Arial;
  }
`;

const MainPanel = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: auto;
`;

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

  return (
    <Users.Provider value={{ user, setUser, logOut: () => setUser(null) }}>
      <Page>
        <div
          style={{
            flex: 1,
            justifyContent: 'center',
            display: 'flex',
            minWidth: '900px',
            width: '100%',
            padding: '5rem',
            maxHeight: '1000px',
            flexDirection: 'row',
          }}
        >
          <MainPanel>
            <UserPanel />
            <DiceControl />
          </MainPanel>
          <EventTray />
        </div>
        <Footer />
      </Page>
    </Users.Provider>
  );
};

ReactApp();
