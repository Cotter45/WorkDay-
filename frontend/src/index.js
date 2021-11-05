import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session';
import SocketProvider from './context/socket';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {

  const isTouch = () => {
        if ('ontouchstart' in window) {
            return true;
        }
        return false;
    }

    const backendForDND = isTouch() ? TouchBackend : HTML5Backend;

  return (
    <ModalProvider>
      <Provider store={store}>
        <SocketProvider>
          <BrowserRouter>
            <DndProvider backend={backendForDND}>
              <App />
            </DndProvider>
          </BrowserRouter>
        </SocketProvider>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
