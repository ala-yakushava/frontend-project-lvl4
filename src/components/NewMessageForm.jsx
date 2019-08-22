import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import NameContext from '../name-context';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
    currentChannelId: state.currentChannelId,
    messageFetchingState: state.messageFetchingState,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class NewMessageForm extends React.Component {
  handleSubmit = ({ text }) => {
    const { currentChannelId, addMessage, reset } = this.props;
    const name = this.context;
    const data = { attributes: { text, author: name } };
    addMessage({ data }, currentChannelId);
    reset();
  };

  render() {
    const {
      handleSubmit, submitting, pristine, error, messageFetchingState,
    } = this.props;

    const isDisabled = submitting || pristine;
    console.log(messageFetchingState, error);

    return (
      <form className="mt-5" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mb-4">
          <Field className="form-control" name="text" required component="textarea" type="text" />
        </div>
        <button type="submit" disabled={isDisabled} className="btn btn-outline-info btn-lg d-flex ml-auto px-5" value="Add">Отправить</button>
      </form>
    );
  }
}

NewMessageForm.contextType = NameContext;
const ConnectedNewMessageForm = connect(mapStateToProps, actionCreators)(NewMessageForm);

export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
