import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history'

import App from './App/App';
import * as serviceWorker from './serviceWorker';

import { configureStore } from './redux/store'
import { registerAxiosInterceptors } from './commons/http/axios'

function renderApp(store, history) {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>
    , document.getElementById('root'));
}

function startApp() {
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })
  const store = configureStore(history);

  registerAxiosInterceptors(store);
  renderApp(store, history);
}
startApp();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();