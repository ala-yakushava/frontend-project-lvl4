import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from 'react-i18next';

const AlertDismissible = () => {
  const [show, setShow] = React.useState(true);
  const { t } = useTranslation();

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <div className="container">{t('alert.error')}</div>
      </Alert>
    );
  }

  return null;
};

export default AlertDismissible;
