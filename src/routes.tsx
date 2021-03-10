import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import App from './App';
import Login from './Login';
import SignUp from './SignUp';
import Target from './Target';
import TargetList from './TargetList';
import TargetDetail from './TargetDetail';
import TargetEdit from './TargetEdit';

export const Path = {
  targetList: '/',
  login: '/login',
  signup: '/signup',
  targetCreate: '/target/create',
  targetDetail: '/target/:id',
  targetEdit: '/target/edit/:id'
};

const routes = (
  <Switch>
    <Route exact path={Path.targetList} component={TargetList} />
    <Route exact path={Path.targetCreate} component={Target} />
    <Route exact path={Path.targetDetail} component={TargetDetail} />
    <Route exact path={Path.targetEdit} component={TargetEdit} />
    <Route exact path={Path.login} component={Login} />
    <Route exact path={Path.signup} component={SignUp} />
  </Switch>
);

export default routes;