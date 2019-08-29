import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertDismissible = () => {
  const [show, setShow] = React.useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <div className="container">Ошибка при отправке данных. Проверьте подключение к сети и попробуйте еще раз.</div>
      </Alert>
    );
  }

  return null;
};

export default AlertDismissible;
