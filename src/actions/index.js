import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const setCurrentChannel = createAction('CHANNEL_SELECT');

export const getNewMessage = createAction('MESSAGE_ADDED_GET');
export const getNewChannel = createAction('CHANNEL_ADDED_GET');
export const getRemovedChannel = createAction('CHANNEL_REMOVED_GET');
export const getRenamedChannel = createAction('CHANNEL_RENAMED_GET');

export const updateDataRequest = createAction('DATA_UPDATE_REQUEST');
export const updateDataSuccess = createAction('DATA_UPDATE_SUCCESS');
export const updateDataFailure = createAction('DATA_UPDATE_FAILURE');

export const addMessage = (data, channelId) => async (dispatch) => {
  dispatch(updateDataRequest());
  try {
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, data);
    dispatch(updateDataSuccess());
  } catch (e) {
    dispatch(updateDataFailure());
    throw e;
  }
};

export const addChannel = data => async (dispatch) => {
  dispatch(updateDataRequest());
  try {
    const url = routes.channelsPath();
    await axios.post(url, data);
    dispatch(updateDataSuccess());
  } catch (e) {
    dispatch(updateDataFailure());
    throw e;
  }
};

export const removeChannel = id => async (dispatch) => {
  dispatch(updateDataRequest());
  try {
    const url = routes.channelPath(id);
    await axios.delete(url);
    dispatch(updateDataSuccess());
  } catch (e) {
    dispatch(updateDataFailure());
    throw e;
  }
};

export const renamedChannel = (data, id) => async (dispatch) => {
  dispatch(updateDataRequest());
  try {
    const url = routes.channelPath(id);
    await axios.patch(url, data);
    dispatch(updateDataSuccess());
  } catch (e) {
    dispatch(updateDataFailure());
    throw e;
  }
};
