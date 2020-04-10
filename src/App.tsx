import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import Footer from 'src/components/Footer';
import DiceControl from 'src/containers/Dice';
import EventTray from 'src/containers/Events';
import UserPanel from 'src/containers/Users';

const ReactApp = () => {
  return ReactDOM.render(<App />, document.getElementById('react-root'));
};

const Page = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  background-color: #214761;

  * {
    font-family: 'Source Sans Pro', Helvetica, Arial;
  }
`;

const MainPanel = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface UserContext {
  user: User | null;
  setUser?: (user: User) => void;
}

const Users = React.createContext<UserContext>({
  user: null,
});

const App: React.SFC<any> = () => {
  const [user, setUser] = React.useState<User>(null);

  return (
    <Users.Provider value={{ user, setUser }}>
      <Page>
        <div
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            minWidth: '900px',
            width: '100%',
            padding: '5rem',
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
