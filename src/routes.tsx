import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import App from './App';
import Login from './Login';
import SignUp from './SignUp';
import Target from './Target';
import TargetList from './TargetList';
import TargetDetail from './TargetDetail';

export const Path = {
  targetList: '/',
  login: '/login',
  signup: '/signup',
  target: '/target',
  targetDetail: '/target/:id'
};

const routes = (
  <Switch>
    <Route exact path={Path.targetList} component={TargetList} />
    <Route exact path={Path.targetDetail} component={TargetDetail} />
    <Route exact path={Path.login} component={Login} />
    <Route exact path={Path.signup} component={SignUp} />
    <Route exact path={Path.target} component={Target} />
  </Switch>
);

export default routes;