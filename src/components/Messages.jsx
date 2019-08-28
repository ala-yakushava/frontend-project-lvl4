import io from 'socket.io-client';
import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { filteredMessagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const messages = filteredMessagesSelector(state);
  return { messages };
};

const actionCreators = {
  getNewMessage: actions.getNewMessage,
};

@connect(mapStateToProps, actionCreators)
class Messages extends React.Component {
  componentDidMount() {
    const { getNewMessage } = this.props;
    const port = process.env.PORT;
    const socket = io(port);

    socket.on('newMessage', data => getNewMessage(data.data));
  }

  render() {
    const { messages } = this.props;

    if (messages.length === 0) {
      return <p className="mb-5">Здесь пока пусто...</p>;
    }

    return (
      <div className="list-group">
        {messages.map(item => (
          <div key={item.id} className="mb-4">
            <p className="text-info text-right font-weight-bold text-capitalize">
              {item.author}
            </p>
            <p className="alert alert-info">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Messages;
