import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import gon from 'gon';
import * as actions from '../actions';

console.log(gon);

const messageFetchingState = handleActions({
  [actions.fetchMessageRequest]() {
    return 'requested';
  },
  [actions.fetchMessageFailure]() {
    return 'failed';
  },
  [actions.fetchMessageSuccess]() {
    return 'finished';
  },
}, 'none');

const currentChannelId = handleActions({
}, gon.currentChannelId);

const channels = handleActions({
}, gon.channels);

const messages = handleActions({
  [actions.getMessage](state, { payload: message }) {
    return [...state, message];
  },
}, gon.messages);

export default combineReducers({
  messageFetchingState,
  currentChannelId,
  channels,
  messages,
  form: formReducer,
});
