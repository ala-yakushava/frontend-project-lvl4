import React from 'react';
import Form from 'react-bootstrap/Form';

const RenamedChannelForm = (props) => {
  const { channel, renameChannel } = props;

  const handleSubmit = (e) => {
    const channelName = e.target.value;
    const data = { attributes: { name: channelName } };
    renameChannel({ data }, channel.id);
  };

  if (channel.removable) {
    return <Form.Control plaintext defaultValue={channel.name} onBlur={handleSubmit} />;
  }

  return <Form.Control plaintext defaultValue={channel.name} readOnly disabled />;
};

export default RenamedChannelForm;
