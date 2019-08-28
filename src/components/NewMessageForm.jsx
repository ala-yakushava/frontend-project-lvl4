import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import UserContext from '../UserContext';

import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId, notification } = state;
  return { currentChannelId, notification };
};

const actionCreators = {
  addMessage: actions.addMessage,
};

@connect(mapStateToProps, actionCreators)
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
    const {
      handleSubmit,
      submitting,
      pristine,
      notification,
    } = this.props;

    const isDisabled = submitting || pristine;

    const renderNotice = (notice) => {
      switch (notice) {
        case 'requested':
          return <span className="text-warning">Ожидайте...</span>;
        case 'failed':
          return <span className="text-danger">Произошла ошибка, попробуйте позже.</span>;
        case 'finished':
          return <span className="text-success">Успех.</span>;
        default:
          return null;
      }
    };

    return (
      <form className="col-12 p-0" onSubmit={handleSubmit(this.handleSubmit)}>
        { renderNotice(notification) }
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

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
