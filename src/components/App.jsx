import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import NameContext from '../name-context';
import getUserName from '../../lib/getUserName';

const App = () => (
  <NameContext.Provider value={getUserName()}>
    <div className="row">
      <div className="col-md-3 my-5">
        <Channels />
      </div>
      <div className="col-md-8 my-5 ml-auto">
        <Messages />
        <NewMessageForm />
      </div>
    </div>
  </NameContext.Provider>
);
export default App;
