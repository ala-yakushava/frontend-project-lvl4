import io from 'socket.io-client';
import React from 'react';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import * as actions from '../actions';
import { channelsSelector } from '../selectors';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import NewChannelModal from './NewChannelModal';
import RemovedChannelModal from './RemovedChannelModal';
import RenamedChannelForm from './RenamedChannelForm';
import AlertDismissible from './AlertDismissible';

const mapStateToProps = (state) => {
  const channels = channelsSelector(state);
  const { editMode, currentChannelId, requestState } = state;
  return {
    editMode,
    requestState,
    channels,
    currentChannelId,
  };
};

const actionCreators = {
  setCurrentChannel: actions.setCurrentChannel,
  toggleEditMode: actions.toggleEditMode,
  removeChannel: actions.removeChannel,
  renameChannel: actions.renameChannel,
  getNewChannel: actions.getNewChannel,
  getRemovedChannel: actions.getRemovedChannel,
  getRenamedChannel: actions.getRenamedChannel,
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  componentDidMount() {
    const { getNewChannel, getRemovedChannel, getRenamedChannel } = this.props;
    const port = process.env.PORT;
    const socket = io(port);

    socket.on('newChannel', data => getNewChannel(data.data));
    socket.on('removeChannel', data => getRemovedChannel(data.data));
    socket.on('renameChannel', data => getRenamedChannel(data.data));
  }

  isError = () => {
    const { requestState } = this.props;
    return requestState === 'failed';
  };

  handleToggleEditMode() {
    const { editMode, toggleEditMode } = this.props;
    toggleEditMode(editMode);
  }

  handleSetCurrentChannel(id) {
    const { setCurrentChannel } = this.props;
    setCurrentChannel({ id });
  }

  render() {
    const {
      channels,
      editMode,
      currentChannelId,
      removeChannel,
      renameChannel,
    } = this.props;

    const renderEditChannel = item => (
      <Row key={item.id}>
        <Col xs={{ span: 8, offset: 1 }}>
          <RenamedChannelForm channel={item} renameChannel={renameChannel} />
        </Col>
        <Col xs={2}>
          {item.removable && <RemovedChannelModal channel={item} removeChannel={removeChannel} />}
        </Col>
      </Row>
    );

    const renderChannel = item => (
      <Nav.Item key={item.id}>
        <Nav.Link eventKey={item.id} onClick={() => this.handleSetCurrentChannel(item.id)}>
          {item.name}
        </Nav.Link>
      </Nav.Item>
    );

    const renderPanel = item => (
      <Tab.Pane eventKey={item.id} key={item.id}>
        <p className="font-weight-bold">
          #
          {item.name}
        </p>
      </Tab.Pane>
    );

    return (
      <>
        {this.isError() ? <AlertDismissible /> : null}
        <div className="container mt-5">
          <Tab.Container id="left-tabs-example" defaultActiveKey={currentChannelId}>
            <Row>
              <Col md={4} className="mb-5">
                <Nav variant="pills" className="flex-column mb-5">
                  {channels.map(editMode ? renderEditChannel : renderChannel)}
                </Nav>
                <NewChannelModal />
                <Button
                  variant="outline-info"
                  size="lg"
                  block
                  className="mt-2"
                  onClick={() => this.handleToggleEditMode()}
                >
                  {editMode ? 'Сохранить' : 'Редактировать'}
                </Button>
              </Col>
              <Col md={{ span: 7, offset: 1 }} className="mb-5">
                <Tab.Content>
                  {channels.map(renderPanel)}
                </Tab.Content>
                <Messages />
                <NewMessageForm />
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </>
    );
  }
}

export default App;
