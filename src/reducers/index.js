import { omit, without } from 'lodash';
import gon from 'gon';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

import * as actions from '../actions';
import normalize from '../../lib/normalize';

const notification = handleActions({
  [actions.runDataRequest]() {
    return 'requested';
  },
  [actions.runDataFailure]() {
    return 'failed';
  },
  [actions.runDataSuccess]() {
    return 'finished';
  },
}, 'none');

const currentChannelId = handleActions({
  [actions.setCurrentChannel](state, { payload: { id } }) {
    return id;
  },
}, gon.currentChannelId);

const channels = handleActions({
  [actions.getNewChannel](state, { payload: { attributes } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.getRemovedChannel](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: omit(byId, id),
      allIds: without(allIds, id),
    };
  },
  [actions.getRenamedChannel](state, { payload: { attributes } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [attributes.id]: attributes },
      allIds,
    };
  },
}, normalize(gon.channels));

const messages = handleActions({
  [actions.getNewMessage](state, { payload: { attributes } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
}, normalize(gon.messages));

export default combineReducers({
  notification,
  currentChannelId,
  channels,
  messages,
  form: formReducer,
});
