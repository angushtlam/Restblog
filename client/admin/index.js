// Import libraries
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import persistState from 'redux-localstorage';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
// import { createHistory } from 'history';

// Import Redux reducers
import reducers from './reducers';

// Import custom components
import App from './app/App';
import Dashboard from './app/Dashboard';
import Articles from './app/Articles';

// Can use when the server is set up with rerouting.
// const history = useRouterHistory(createHistory)({
//   basename: '/admin'
// });

const enhancer = compose(
  persistState()
);

const loggerMiddleware = createLogger();
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
  enhancer
);

render(
  <Provider store={store}>
    <Router basename='/admin' history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Dashboard}></IndexRoute>
        <Route path='/articles' component={Articles}></Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
