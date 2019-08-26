import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import RenamedChannelForm from './RenamedChannelForm';

function MyVerticallyCenteredModal(props) {
  const { onHide, currentId } = props;
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить название канала
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenamedChannelForm onHide={onHide} currentId={currentId} />
      </Modal.Body>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant="outline-info" onClick={() => setModalShow(true)}>\\</Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </ButtonToolbar>
  );
}

export default App;
