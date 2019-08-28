import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  addChannel: actions.addChannel,
};

@connect(mapStateToProps, actionCreators)
class NewChannelForm extends React.Component {
  handleSubmit = ({ channelName }) => {
    const { addChannel, onHide } = this.props;
    const data = { attributes: { name: channelName } };
    addChannel({ data });
    onHide();
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const isDisabled = submitting || pristine;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group row">
          <div className="col-sm-8">
            <Field
              component="input"
              type="text"
              name="channelName"
              className="form-control form-control-lg"
              placeholder="Название канала"
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-lg btn-info" disabled={isDisabled}>
            Создать
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newChannel',
})(NewChannelForm);
