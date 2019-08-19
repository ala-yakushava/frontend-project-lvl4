import ReactDOM from 'react-dom';
import React from 'react';

import Component from './Component.jsx';

export default (data) => {
  ReactDOM.render(
    <Component {...data} />,
    document.getElementById('chat'),
  );
};
