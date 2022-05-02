import React, { Fragment } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Landing from './scenes/landing/Landing';
import Dialogs from './dialogs';

import history from './history';

const Routes = () => (
  <Router
    history={history}
  >
    <Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
      <Dialogs />
    </Fragment>
  </Router>
);

export default Routes;
