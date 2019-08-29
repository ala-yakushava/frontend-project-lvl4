import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import UserContext from '../UserContext';

import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const actionCreators = {
  addMessage: actions.addMessage,
};

@connect(mapStateToProps, actionCreators)
@(reduxForm({ form: 'newMessage' }))
class NewMessageForm extends React.Component {
  static contextType = UserContext;

  handleSubmit = ({ text }) => {
    const { currentChannelId, addMessage, reset } = this.props;
    const { name } = this.context;
    const data = { attributes: { text, author: name } };
    addMessage({ data }, currentChannelId);
    reset();
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const isDisabled = submitting || pristine;

    return (
      <form className="col-12 p-0" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group my-4">
          <Field
            component="textarea"
            type="text"
            name="text"
            className="form-control"
            placeholder="Введите текст"
            required
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-outline-info btn-block btn-lg" disabled={isDisabled}>
          Отправить
        </button>
      </form>
    );
  }
}

export default NewMessageForm;
