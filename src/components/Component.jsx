import axios from 'axios';
import io from 'socket.io-client';
import React from 'react';
import getUserName from '../../lib/getUserName';
import routes from '../routes';

export default class Component extends React.Component {
  state = { ...this.props, text: '', name: getUserName() };

  componentDidMount() {
    const port = process.env.PORT;
    const socket = io(port);

    socket.on('newMessage', (data) => {
      const { messages } = this.state;
      this.setState({ messages: [...messages, data.data.attributes] });
    });
  }

  handleChangeText = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { currentChannelId, text, name } = this.state;
    const url = routes.channelMessagesPath(currentChannelId);

    axios.post(url, { data: { attributes: { text, author: name } } });
    // .then(res => console.log(res.config.data))
    // .catch(err => console.log(err));
  }

  render() {
    const { messages, channels, text } = this.state;

    return (
      <div className="row">
        <div className="col-md-3 my-5">
          <ul className="list-group">
            {channels.map(item => <li key={item.id} className="list-group-item list-group-item-info">{item.name}</li>)}
          </ul>
        </div>
        <div className="col-md-8 my-5 ml-auto">
          <ul className="list-group">
            {messages.length
              ? messages.map(item => (
                <div key={item.id} className="mb-4">
                  <p className="text-info text-right font-weight-bold text-capitalize">{item.author}</p>
                  <p className="alert alert-info">{item.text}</p>
                </div>
              )) : <p>Начните беседу</p>}
          </ul>
          <form className="mt-5" onSubmit={this.handleSubmitForm}>
            <div className="form-group mb-4">
              <textarea className="form-control" rows="3" onChange={this.handleChangeText} value={text} />
            </div>
            <button type="submit" className="btn btn-outline-info btn-lg d-flex ml-auto px-5">Отправить</button>
          </form>
        </div>
      </div>
    );
  }
}
