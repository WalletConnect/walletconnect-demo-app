import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SCard, SContainer, SParameter, SButtonContainer, SButton } from './common';
import { convertAmountFromRawNumber, convertHexToString } from '../../helpers/bignumber';

class TransactionRequest extends Component {
  render() {
    const { callRequest, approveCallRequest, rejectCallRequest } = this.props;
    console.log('TransactionRequest', this.props);
    const tx = callRequest.params[0];
    const params = [
      { label: 'From', value: tx.from },
      { label: 'To', value: tx.to },
      { label: 'Value', value: `${convertAmountFromRawNumber(convertHexToString(tx.value))} ETH` },
      { label: 'Data', value: tx.input || tx.data || '0x' },
    ];
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

TransactionRequest.propTypes = {
  callRequest: PropTypes.object.isRequired,
  approveCallRequest: PropTypes.func.isRequired,
  rejectCallRequest: PropTypes.func.isRequired,
};

export default TransactionRequest;
