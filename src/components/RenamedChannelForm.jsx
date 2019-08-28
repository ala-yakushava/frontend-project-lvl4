import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  renamedChannel: actions.renamedChannel,
};

@connect(mapStateToProps, actionCreators)
class RenamedChannelForm extends React.Component {
  handleSubmit = ({ channelName }) => {
    const { channelId, renamedChannel, onHide } = this.props;
    const data = { attributes: { name: channelName } };
    renamedChannel({ data }, channelId);
    onHide();
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const isDisabled = submitting || pristine;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Form.Group as={Row}>
          <Col sm="8">
            <Field
              component="input"
              type="text"
              name="channelName"
              className="form-control form-control-lg"
              placeholder="Название канала"
              required
              autoFocus
            />
          </Col>
          <Col sm="2">
            <Button type="submit" variant="outline-info" size="lg" disabled={isDisabled}>
              Изменить
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'renamedChannel',
})(RenamedChannelForm);
