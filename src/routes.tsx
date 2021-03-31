import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Target from './Target';
// import TargetList from './TargetList';
// import TargetDetail from './TargetDetail';
import TargetEdit from './TargetEdit';

import Testpage from 'Pages/testpage';
import Testpage2 from 'Pages/testpage2';
import Testpage3 from 'Pages/testpage3';

export const Path = {
  // targetList: '/',
  test2: '/target/:id',
  test3: '/done/:week_id',
  test: '/',
  login: '/login',
  signup: '/signup',
  targetCreate: '/target/create',
  // targetDetail: '/target/:id',
  targetEdit: '/target/edit/:id'
};

const routes = (
  <Switch>
    {/* <Route exact path={Path.targetList} component={TargetList} /> */}
    <Route exact path={Path.test} component={Testpage} />
    <Route exact path={Path.test2} component={Testpage2} />
    <Route exact path={Path.test3} component={Testpage3} />
    <Route exact path={Path.targetCreate} component={Target} />
    {/* <Route exact path={Path.targetDetail} component={TargetDetail} /> */}
    <Route exact path={Path.targetEdit} component={TargetEdit} />
    <Route exact path={Path.login} component={Login} />
    <Route exact path={Path.signup} component={SignUp} />
  </Switch>
);

export default routes;