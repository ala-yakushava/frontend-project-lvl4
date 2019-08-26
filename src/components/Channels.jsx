import io from 'socket.io-client';
import React from 'react';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import * as actions from '../actions';
import { channelsSelector } from '../selectors';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import NewChannelModal from './NewChannelModal';
import RenamedChannelModal from './RenamedChannelModal';
import RemovedChannelModal from './RemovedChannelModal';

const mapStateToProps = (state) => {
  const channels = channelsSelector(state);
  return { channels };
};

const actionCreators = {
  setCurrentChannel: actions.setCurrentChannel,
  removeChannel: actions.removeChannel,
  getNewChannel: actions.getNewChannel,
  getRemovedChannel: actions.getRemovedChannel,
  getRenamedChannel: actions.getRenamedChannel,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  componentDidMount() {
    const { getNewChannel, getRemovedChannel, getRenamedChannel } = this.props;
    const port = process.env.PORT;
    const socket = io(port);

    socket.on('newChannel', data => getNewChannel(data.data));
    socket.on('removeChannel', data => getRemovedChannel(data.data));
    socket.on('renameChannel', data => getRenamedChannel(data.data));
  }

  handleSetCurrentChannel(id) {
    const { setCurrentChannel } = this.props;
    setCurrentChannel({ id });
  }

  render() {
    const { channels, removeChannel } = this.props;

    const renderChannel = item => (
      <Nav.Item key={item.id}>
        <Row>
          <Col sm={6}>
            <Nav.Link eventKey={item.id} onClick={() => this.handleSetCurrentChannel(item.id)}>
              {item.name}
            </Nav.Link>
          </Col>
          { !item.removable ? null : (
            <>
              <Col sm={2}>
                <RenamedChannelModal currentId={item.id} />
              </Col>
              <Col sm={2}>
                <RemovedChannelModal currentId={item.id} removeChannel={removeChannel} />
              </Col>
            </>
          )}
        </Row>
      </Nav.Item>
    );

    const renderPanel = item => (
      <Tab.Pane eventKey={item.id} key={item.id}>
        <b>
          #
          {item.name}
        </b>
        <br />
      </Tab.Pane>
    );

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="general">
        <Row>
          <Col sm={4} className="mb-5">
            <Nav variant="pills" className="flex-column mb-5">
              {channels.map(renderChannel)}
            </Nav>
            <NewChannelModal />
          </Col>
          <Col sm={7} className="row ml-auto mb-5">
            <Tab.Content>
              {channels.map(renderPanel)}
            </Tab.Content>
            <Messages />
            <NewMessageForm />
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default Channels;
