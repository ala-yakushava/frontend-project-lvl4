import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import NewChannelForm from './NewChannelForm';

function MyVerticallyCenteredModal(props) {
  const { onHide } = props;

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новый канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-4">
        <NewChannelForm onHide={onHide} />
      </Modal.Body>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button
        variant="outline-info"
        size="lg"
        block
        onClick={() => setModalShow(true)}
      >
        Создать канал
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

export default App;
