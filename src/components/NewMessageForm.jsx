import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import NameContext from '../context';
import * as actions from '../actions';
import { getCurrentChannelId } from '../selectors';

const mapStateToProps = (state) => {
  const currentChannelId = getCurrentChannelId(state);
  const { messageFetchingState } = state;
  return { currentChannelId, messageFetchingState };
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
      handleSubmit,
      submitting,
      pristine,
      sendDataState,
    } = this.props;

    const isDisabled = submitting || pristine;

    const getNote = (state) => {
      switch (state) {
        case 'requested':
          return <span className="text-warning">Ожидайте...</span>;
        case 'failed':
          return <span className="text-danger">Произошла ошибка, попробуйте позже.</span>;
        case 'finished':
          return null;
        default:
          return null;
      }
    };

    return (
      <form className="col-12 align-self-end p-0" onSubmit={handleSubmit(this.handleSubmit)}>
        { getNote(sendDataState) }
        <div className="form-group my-4">
          <Field className="form-control" name="text" required component="textarea" type="text" />
        </div>
        <button type="submit" disabled={isDisabled} className="btn btn-outline-info btn-block btn-lg" value="Add">Отправить</button>
      </form>
    );
  }
}

NewMessageForm.contextType = NameContext;
const ConnectedNewMessageForm = connect(mapStateToProps, actionCreators)(NewMessageForm);

export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
