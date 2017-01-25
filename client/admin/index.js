// Import libraries
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

// Import custom components
import Admin from './Admin';
import Dashboard from './Dashboard';

const history = useRouterHistory(createHistory)({
  basename: '/admin'
});

render(
  <Router history={history}>
    <Route path='/' component={Admin}>
      <IndexRoute component={Dashboard}></IndexRoute>
    </Route>
  </Router>
, document.getElementById('app'));
