import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import SignUp from './SignUp';


export const Path = {
  app: '/',
  login: '/login',
  signup: '/signup'
};

const routes = (
  <Switch>
    <Route exact path={Path.app} component={App} />
    <Route exact path={Path.login} component={Login} />
    <Route exact path={Path.signup} component={SignUp} />
  </Switch>
);

export default routes;