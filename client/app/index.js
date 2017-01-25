// Import libraries
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

// Import custom components
import App from './App';
import Home from './Home';

render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}></IndexRoute>
    </Route>
  </Router>
, document.getElementById('app'));
