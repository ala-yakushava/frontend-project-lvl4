import React from 'react';

import Channels from './Channels';
import NameContext from '../context';
import getUserName from '../../lib/getUserName';

const App = () => (
  <NameContext.Provider value={getUserName()}>
    <Channels />
  </NameContext.Provider>
);

export default App;
