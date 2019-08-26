import { createSelector } from 'reselect';

export const getMessagesById = state => state.messages.byId;
export const getMessageIds = state => state.messages.allIds;
export const getCurrentChannelId = state => state.currentChannelId;

export const messagesSelector = createSelector(
  [getMessagesById, getMessageIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const filteredMessagesSelector = createSelector(
  [messagesSelector, getCurrentChannelId],
  (messages, channelId) => (messages.filter(m => m.channelId === channelId)),
);

export const getChannelsById = state => state.channels.byId;
export const getChannelIds = state => state.channels.allIds;

export const channelsSelector = createSelector(
  [getChannelsById, getChannelIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);
