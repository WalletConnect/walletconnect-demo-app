import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SCard, SContainer, SParameter, SButtonContainer, SButton } from './common';

class MessageRequest extends Component {
  render() {
    const { callRequest, approveCallRequest, rejectCallRequest } = this.props;
    const address = callRequest.params[0];
    const message = callRequest.params[1];
    const params = [{ label: 'Address', value: address }, { label: 'Message', value: message }];
    return (
      <SCard>
        {params.map(param => (
          <SParameter key={param.label} param={param} />
        ))}
        <SContainer>
          <SButtonContainer>
            <SButton onPress={rejectCallRequest}>{'Reject'}</SButton>
            <SButton onPress={approveCallRequest}>{'Approve'}</SButton>
          </SButtonContainer>
        </SContainer>
      </SCard>
    );
  }
}

MessageRequest.propTypes = {
  callRequest: PropTypes.object.isRequired,
  approveCallRequest: PropTypes.func.isRequired,
  rejectCallRequest: PropTypes.func.isRequired,
};

export default MessageRequest;
