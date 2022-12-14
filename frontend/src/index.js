import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as benchActions from './store/benches';
import { ModalProvider } from './context/Modal';

// let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
// let initialState = {}

// if (currentUser) {
//   initialState = {
//     session: {
//       user: {
//         [currentUser.id]: currentUser
//       }
//     }
//   }
// }

// const initialState = {
//   user: JSON.parse(sessionStorage.getItem('currentUser'))
// };

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.benchActions = benchActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
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

if (
  sessionStorage.getItem('X-CSRF-Token') === null ||
  sessionStorage.getItem('currentUser') === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
