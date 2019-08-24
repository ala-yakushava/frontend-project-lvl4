import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const channels = channelsSelector(state);
  return { channels };
};

const actionCreators = {
  getMessage: actions.getMessage,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  componentDidMount() {}

  render() {
    const { channels } = this.props;

    return (
      <ul className="list-group">
        {channels.map(item => <li key={item.id} className="list-group-item list-group-item-info">{item.name}</li>)}
      </ul>
    );
  }
}

export default Channels;
