import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import * as actions from './actions';
import reducers from './reducers';
import App from './components/App';
import UserContext from './UserContext';
import getUserName from '../lib/getUserName';
import '../lib/i18n';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext ? ext() : f => f;
/* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

const initializeSockets = () => {
  const port = process.env.PORT;
  const socket = io(port);

  const {
    getNewChannel,
    deleteChannel,
    getRenamedChannel,
    getNewMessage,
  } = actions;

  socket.on('newChannel', data => store.dispatch(getNewChannel(data.data)));
  socket.on('removeChannel', data => store.dispatch(deleteChannel(data.data)));
  socket.on('renameChannel', data => store.dispatch(getRenamedChannel(data.data)));
  socket.on('newMessage', data => store.dispatch(getNewMessage(data.data)));
};

export default () => {
  const user = {
    name: getUserName(),
  };

  initializeSockets();

  render(
    <Provider store={store}>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
