import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  renamedChannel: actions.renamedChannel,
};

class RenamedChannelForm extends React.Component {
  handleSubmit = ({ channelName }) => {
    const { renamedChannel, onHide, currentId } = this.props;
    const data = { attributes: { name: channelName } };
    renamedChannel({ data }, currentId);
    onHide();
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const isDisabled = submitting || pristine;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group row my-4">
          <div className="col-sm-8">
            <Field
              component="input"
              type="text"
              name="channelName"
              className="form-control form-control-lg"
              placeholder="Название канала"
              required
            />
          </div>
          <button type="submit" disabled={isDisabled} className="btn btn-lg btn-info">Изменить</button>
        </div>
      </form>
    );
  }
}

const ConnectedRenamedChannelForm = connect(mapStateToProps, actionCreators)(RenamedChannelForm);

export default reduxForm({
  form: 'renamedChannel',
})(ConnectedRenamedChannelForm);
