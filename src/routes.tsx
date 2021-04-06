import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Auth from './Pages/Auth';
import { Cookie } from 'service/cookieService';

import Testpage from 'Pages/testpage';
import Testpage2 from 'Pages/testpage2';
import Testpage3 from 'Pages/testpage3';
import Navbar from 'Components/Navbar';

export const Path = {
  test2: '/target/:id',
  test3: '/done/:week_id',
  test: '/',
  login: '/login',
  signup: '/signup',
};
const cookie = new Cookie();

const routes = (
  <div>
    <Navbar cookie={cookie} />
    <Switch>
      <Route exact path={Path.login} render={() => <Login cookie={cookie} />}/>
      <Route exact path={Path.signup} component={SignUp} />
      <Auth>
        <Switch>
          <Route exact path={Path.test} component={Testpage} />
          <Route exact path={Path.test2} component={Testpage2} />
          <Route exact path={Path.test3} component={Testpage3} />
        </Switch>
      </Auth>
    </Switch>
  </div>
);

export default routes;