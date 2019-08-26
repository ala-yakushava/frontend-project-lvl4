import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function MyVerticallyCenteredModal(props) {
  const { onHide, currentId, removeChannel } = props;
  const handleRemoveChannel = id => removeChannel(id);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="my-4">Подтвердите удаление канала и всех его сообщений.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="lg" onClick={onHide}>Закрыть</Button>
        <Button variant="info" size="lg" className="ml-3" onClick={() => handleRemoveChannel(currentId)}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button variant="outline-info" onClick={() => setModalShow(true)}>X</Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </ButtonToolbar>
  );
}

export default App;
