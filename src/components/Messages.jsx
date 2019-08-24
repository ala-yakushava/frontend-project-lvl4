import io from 'socket.io-client';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { messagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const messages = messagesSelector(state);
  return { messages };
};

const actionCreators = {
  getMessage: actions.getMessage,
};

@connect(mapStateToProps, actionCreators)
class Messages extends React.Component {
  componentDidMount() {
    const { getMessage } = this.props;
    const port = process.env.PORT;
    const socket = io(port);

    socket.on('newMessage', data => getMessage(data.data.attributes));
  }

  render() {
    const { messages } = this.props;

    if (messages.length === 0) {
      return <b>Начните беседу</b>;
    }

    return (
      <ul className="list-group">
        {messages.map(item => (
          <div key={item.id} className="mb-4">
            <p className="text-info text-right font-weight-bold text-capitalize">{item.author}</p>
            <p className="alert alert-info">{item.text}</p>
          </div>
        ))}
      </ul>
    );
  }
}

export default Messages;
