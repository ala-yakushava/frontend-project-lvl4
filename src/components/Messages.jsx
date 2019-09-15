import React from 'react';
import { useTranslation } from 'react-i18next';

const Messages = ({ messages }) => {
  const { t } = useTranslation();

  if (messages.length === 0) {
    return <p className="mb-5">{t('text.empty')}</p>;
  }

  return (
    <div className="list-group">
      {messages.map(item => (
        <div key={item.id} className="mb-4">
          <p className="text-info text-right font-weight-bold text-capitalize">
            {item.author}
          </p>
          <p className="alert alert-info">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
