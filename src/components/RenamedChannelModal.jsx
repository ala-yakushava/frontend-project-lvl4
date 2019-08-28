import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import RenamedChannelForm from './RenamedChannelForm';

function MyVerticallyCenteredModal(props) {
  const {
    show,
    onHide,
    channelId,
    channelName,
  } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Сменить имя для канала #
          {channelName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-4">
        <RenamedChannelForm onHide={onHide} channelId={channelId} />
      </Modal.Body>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => setModalShow(true)}
      >
        edit
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </ButtonToolbar>
  );
}

export default App;
