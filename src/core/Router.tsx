import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { Users } from 'src/App';
import LoginForm from 'src/components/LoginForm';
import Menu from 'src/containers/Menu';
import { RoomProvider } from 'src/context/rooms';
import Room from 'src/containers/Room';

const PrivateRoute = (props: RouteProps) => {
  const userContext = React.useContext(Users);
  if (!userContext.user) {
    return (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
  }
  return <Route {...props} />;
};

export default () => {
  return (
    <RoomProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact render={() => <Menu />} />
          <PrivateRoute path="/room/:roomId" render={() => <Room />} />
          <Route path="/login" render={(props: RouteProps) => <LoginForm />} />
        </Switch>
      </Router>
    </RoomProvider>
  );
};
