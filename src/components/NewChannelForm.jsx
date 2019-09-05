import axios from 'axios';
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { useTranslation } from 'react-i18next';

import routes from '../routes';

const NewChannelForm = (props) => {
  const {
    onHide,
    handleSubmit,
    submitting,
    pristine,
    error,
  } = props;

  const { t } = useTranslation();

  const createChannel = ({ channelName }) => {
    const data = { attributes: { name: channelName } };
    const url = routes.channelsPath();

    return axios.post(url, { data })
      .then(() => {
        onHide();
      })
      .catch(() => {
        throw new SubmissionError({
          _error: t('note.error'),
        });
      });
  };

  const isDisabled = submitting || pristine;

  return (
    <form onSubmit={handleSubmit(createChannel)}>
      <div className="form-group row">
        <div className="col-sm-8">
          <Field
            component="input"
            type="text"
            name="channelName"
            className="form-control form-control-lg"
            placeholder={t('placeholder.channel_name')}
            required
          />
          {error && <span className="text-danger position-absolute">{error}</span>}
          {submitting && <span className="text-warning position-absolute">{t('note.create_channel')}</span>}
        </div>
        <button type="submit" className="btn btn-lg btn-info" disabled={isDisabled}>
          {t('button.create')}
        </button>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'newChannel' })(NewChannelForm);
