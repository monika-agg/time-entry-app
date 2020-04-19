import React from 'react';
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';
import configureStore from '../shared/store';
import { getCookieHelpers } from './cookies'
import App from '../shared/App';
import { createBrowserHistory } from 'history'
import Routes from 'shared/route'
const history = createBrowserHistory();
const helpers = {}
const store = window.store || configureStore(window.__INITIAL_STATE__, helpers);

const { clearCookie, setCookie, syncCookies } = store.dispatch(getCookieHelpers())
syncCookies()
helpers.setCookie = setCookie
helpers.clearCookie = clearCookie
helpers.syncCookies = syncCookies

hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App routes={Routes}/>
    </Router>
  </Provider>
  , document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}

if (!window.store) {
  window.store = store;
}
