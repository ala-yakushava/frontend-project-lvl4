import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  addChannel: actions.addChannel,
};

class NewChannelForm extends React.Component {
  handleSubmit = ({ channelName }) => {
    const { addChannel, onHide } = this.props;
    addChannel({ data: { attributes: { name: channelName } } });
    onHide();
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const isDisabled = submitting || pristine;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group row my-4">
          <div className="col-sm-9">
            <Field
              component="input"
              type="text"
              name="channelName"
              className="form-control form-control-lg"
              placeholder="Название канала"
              required
            />
          </div>
          <button type="submit" disabled={isDisabled} className="btn btn-lg btn-info" value="Add">Создать</button>
        </div>
      </form>
    );
  }
}

const ConnectedNewChannelForm = connect(mapStateToProps, actionCreators)(NewChannelForm);

export default reduxForm({
  form: 'newChannel',
})(ConnectedNewChannelForm);
