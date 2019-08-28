import React from 'react';

function ResultRequestNote(props) {
  const { notification } = props;

  switch (notification) {
    case 'requested':
      return <span className="text-warning">Ожидайте...</span>;
    case 'failed':
      return <span className="text-danger">Произошла ошибка, попробуйте позже.</span>;
    case 'finished':
      return <span className="text-success">Успех.</span>;
    default:
      return null;
  }
}

export default ResultRequestNote;
