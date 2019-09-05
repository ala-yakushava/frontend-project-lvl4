import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

const MyVerticallyCenteredModal = (props) => {
  const {
    show,
    onHide,
    channel,
    removeChannel,
  } = props;

  const { t } = useTranslation();
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
          {t('modal.remove_channel.title')}
          {channel.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-4">
        {t('modal.remove_channel.text')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('button.close')}
        </Button>
        <Button
          variant="info"
          className="ml-2"
          onClick={() => handleRemoveChannel(channel.id)}
        >
          {t('button.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const RemovedChannelModal = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => setModalShow(true)}
      >
        X
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </ButtonToolbar>
  );
};

export default RemovedChannelModal;
