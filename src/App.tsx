import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import Greeting from 'src/components/Greeting';
import Footer from 'src/components/Footer';
import DiceControl from './components/DiceControl';
import EventTray from './components/EventTray';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

/* Configure Redux-store *

function configureStore() {
  const epics = configureEpics();

  const epicMiddleWare = createEpicMiddleware();
  const store = createStore(
    testStore,
    composeWithDevTools(applyMiddleware(epicMiddleWare))
  );

  epicMiddleWare.run(epics);

  return store;
} */

const ReactApp = () => {
  /* Enable with Redux *
  const reduxStore = configureStore();
  const { dispatch, getState } = reduxStore;

  if (process.env.NODE_ENV === 'development') {
    console.debug('Running app in Development Mode');
    window['redux'] = {dispatch, getState};
  } */

  return ReactDOM.render(
    <App /* store={reduxStore} */ />,
    document.getElementById('react-root')
  );
};

const Page = styled.div`
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

const App: React.SFC<any> = ({ store }: any) => (
  // <Provider store={store}>
  <Page>
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: '900px',
      }}
    >
      <DiceControl />
      <EventTray />
    </div>
    <Footer />
  </Page>
  // </Provider>
);

ReactApp();
