import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';


export const setCurrentChannel = createAction('CHANNEL_SELECT');

export const getNewMessage = createAction('MESSAGE_ADDED_GET');
export const getNewChannel = createAction('CHANNEL_ADDED_GET');
export const getRemovedChannel = createAction('CHANNEL_REMOVED_GET');
export const getRenamedChannel = createAction('CHANNEL_RENAMED_GET');

export const sendDataRequest = createAction('DATA_SEND_REQUEST');
export const sendDataSuccess = createAction('DATA_SEND_SUCCESS');
export const sendDataFailure = createAction('DATA_SEND_FAILURE');

export const addMessage = (data, channelId) => async (dispatch) => {
  dispatch(sendDataRequest());
  try {
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, data);
    dispatch(sendDataSuccess());
  } catch (e) {
    dispatch(sendDataFailure());
    throw e;
  }
};

export const addChannel = data => async (dispatch) => {
  dispatch(sendDataRequest());
  try {
    const url = routes.channelsPath();
    await axios.post(url, data);
    dispatch(sendDataSuccess());
  } catch (e) {
    dispatch(sendDataFailure());
    throw e;
  }
};

export const removeChannel = id => async (dispatch) => {
  dispatch(sendDataRequest());
  try {
    const url = routes.channelPath(id);
    await axios.delete(url);
    dispatch(sendDataSuccess());
  } catch (e) {
    dispatch(sendDataFailure());
    throw e;
  }
};

export const renamedChannel = (data, id) => async (dispatch) => {
  dispatch(sendDataRequest());
  try {
    const url = routes.channelPath(id);
    await axios.patch(url, data);
    dispatch(sendDataSuccess());
  } catch (e) {
    dispatch(sendDataFailure());
    throw e;
  }
};
