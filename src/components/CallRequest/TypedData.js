import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SCard, SContainer, SParameter, SButtonContainer, SButton } from './common';

const formatObjectValues = obj =>
  Object.keys(obj).map(key => {
    const label = key;
    let value = obj[key];
    if (typeof value === 'object') {
      value = formatObjectValues(value);
    }

    return { label, value };
  });

class TypedDataRequest extends Component {
  render() {
    const { callRequest, approveCallRequest, rejectCallRequest } = this.props;
    const address = { label: 'Address', value: callRequest.params[0] };
    const typedData = typeof callRequest.params[1] === 'string' ? JSON.parse(callRequest.params[1]) : callRequest.params[1];
    const domain = { label: 'Domain', value: formatObjectValues(typedData.domain) };
    const message = { label: typedData.primaryType, value: formatObjectValues(typedData.message) };
    const params = [address, domain, message];
    console.log('TypedDataRequest params', params);
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

TypedDataRequest.propTypes = {
  callRequest: PropTypes.object.isRequired,
  approveCallRequest: PropTypes.func.isRequired,
  rejectCallRequest: PropTypes.func.isRequired,
};

export default TypedDataRequest;
