import gon from 'gon';
import normalize from '../lib/normalize';

const { messages, channels, currentChannelId } = gon;

export default {
  messages: normalize(messages),
  channels: normalize(channels),
  currentChannelId,
};
