import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import NewChannelForm from './NewChannelForm';

const MyVerticallyCenteredModal = (props) => {
  const { onHide } = props;
  const { t } = useTranslation();

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('modal.new_channel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-4">
        <NewChannelForm onHide={onHide} />
      </Modal.Body>
    </Modal>
  );
};

const NewChannelModal = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { t } = useTranslation();

  return (
    <ButtonToolbar>
      <Button
        variant="outline-info"
        size="lg"
        block
        onClick={() => setModalShow(true)}
      >
        {t('button.create_channel')}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
};

export default NewChannelModal;
