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
    <Router>
      <Switch>
        <PrivateRoute path="/" exact render={() => <Menu />} />
        <PrivateRoute path="/game/:id" />
        <Route path="/login" render={(props: RouteProps) => <LoginForm />} />
      </Switch>
    </Router>
  );
};
