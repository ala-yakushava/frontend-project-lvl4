import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const getMessage = createAction('MESSAGE_GET');
export const fetchMessageRequest = createAction('MESSAGE_FETCH_REQUEST');
export const fetchMessageSuccess = createAction('MESSAGE_FETCH_SUCCESS');
export const fetchMessageFailure = createAction('MESSAGE_FETCH_FAILURE');

export const addMessage = (data, currentChannelId) => async (dispatch) => {
  dispatch(fetchMessageRequest());
  try {
    const url = routes.channelMessagesPath(currentChannelId);
    await axios.post(url, data);
    dispatch(fetchMessageSuccess());
  } catch (e) {
    dispatch(fetchMessageFailure());
    throw e;
  }
};
