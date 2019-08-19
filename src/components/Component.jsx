import React from 'react';

export default class Component extends React.Component {
  state = {};

  render() {
    const { channels, messages } = this.props;

    return (
      <div className="row">
        <div className="col-md-3 my-5">
          <ul className="list-group">
            {channels.map(item => <li key={item.id} className="list-group-item list-group-item-info">{item.name}</li>)}
          </ul>
        </div>
        <div className="col-md-9 my-5">
          <ul className="list-group">
            {messages.length ? null : <p>Начните беседу</p>}
          </ul>
          <form>
            <div className="form-group">
              <textarea className="form-control" rows="3" />
            </div>
            <button type="submit" className="btn btn-outline-info btn-lg d-flex ml-auto px-5">Отправить</button>
          </form>
        </div>
      </div>
    );
  }
}
