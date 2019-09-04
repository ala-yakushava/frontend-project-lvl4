import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import UserContext from '../UserContext';
import routes from '../routes';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

@connect(mapStateToProps)
@(reduxForm({ form: 'newMessage' }))
class NewMessageForm extends React.Component {
  static contextType = UserContext;

  handleSubmit = ({ text }) => {
    const { currentChannelId, reset } = this.props;
    const { name } = this.context;
    const data = { attributes: { text, author: name } };
    const url = routes.channelMessagesPath(currentChannelId);

    return axios.post(url, { data })
      .then(() => {
        reset();
      })
      .catch(() => {
        throw new SubmissionError({
          _error: 'Проверьте подключение к сети',
        });
      });
  };

  handleKeyDown = (e) => {
    const { value } = e.target;
    if (e.keyCode === 13 && value.length) {
      this.handleSubmit({ text: value });
    }
  }

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      error,
    } = this.props;
    const isDisabled = submitting || pristine;

    return (
      <>
        {error && <span className="text-danger position-absolute">{error}</span>}
        {submitting && <span className="text-warning position-absolute">Сообщение отправляется...</span>}
        <form className="col-12 p-0" onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="form-group my-4">
            <Field
              component="textarea"
              type="text"
              name="text"
              className="form-control"
              placeholder="Введите текст"
              onKeyDown={this.handleKeyDown}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-outline-info btn-block btn-lg" disabled={isDisabled}>
            Отправить
          </button>
        </form>
      </>
    );
  }
}

export default NewMessageForm;
