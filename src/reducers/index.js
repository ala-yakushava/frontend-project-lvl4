import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import gon from 'gon';
import * as actions from '../actions';
import normalize from '../../lib/normalize';

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
}, normalize(gon.channels));

const messages = handleActions({
  [actions.getMessage](state, { payload: message }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
}, normalize(gon.messages));

export default combineReducers({
  messageFetchingState,
  currentChannelId,
  channels,
  messages,
  form: formReducer,
});
