import { omit, without, pickBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

import * as actions from '../actions';
import initData from '../initData';

const requestState = handleActions({
  [actions.updateDataRequest]() {
    return 'requested';
  },
  [actions.updateDataFailure]() {
    return 'failed';
  },
  [actions.updateDataSuccess]() {
    return 'finished';
  },
}, 'none');

const currentChannelId = handleActions({
  [actions.setCurrentChannel](state, { payload: { id } }) {
    return id;
  },
}, initData.currentChannelId);

const editMode = handleActions({
  [actions.toggleEditMode](state, { payload: edit }) {
    return !edit;
  },
}, false);

const channels = handleActions({
  [actions.getNewChannel](state, { payload: { attributes } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.deleteChannel](state, { payload: { id } }) {
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
}, initData.channels);

const messages = handleActions({
  [actions.getNewMessage](state, { payload: { attributes } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.deleteChannel](state, { payload: { id } }) {
    const { byId, allIds } = state;
    const deletedMessages = pickBy(byId, { channelId: id });
    const ids = Object.keys(deletedMessages).map(i => +i);
    return {
      byId: omit(byId, ids),
      allIds: without(allIds, ...ids),
    };
  },
}, initData.messages);

export default combineReducers({
  requestState,
  currentChannelId,
  editMode,
  channels,
  messages,
  form: formReducer,
});
