import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session'

let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
let initialState = {}

if (currentUser) {
  initialState = {
    session: {
      user: {
        [currentUser.id]: currentUser
      }
    }
  }
}

const store = configureStore(initialState);

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem('X-CSRF-Token') === null) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}
