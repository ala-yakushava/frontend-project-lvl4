import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

function MyVerticallyCenteredModal(props) {
  const {
    show,
    onHide,
    channelId,
    channelName,
    removeChannel,
  } = props;

  const handleRemoveChannel = id => removeChannel(id);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить канал #
          {channelName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-4">
        Подтвердите удаление канала и всех его сообщений.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button
          variant="info"
          className="ml-2"
          onClick={() => handleRemoveChannel(channelId)}
        >
          Удалить
        </Button>
      </Modal.Footer>
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
        del
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
