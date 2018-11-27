import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'react-native';
import Button from '../components/Button';
import { convertAmountFromRawNumber, convertHexToString } from '../helpers/bignumber';

const SCard = styled.View`
  background-color: rgb(255, 255, 255);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const STransactionDetailContainer = styled.View`
  width: 100%;
  padding: 20px;
  min-height: 77px;
`;

const STransactionDetailSeparator = styled.View`
  width: 100%;
  position: absolute;
  left: 18px;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(230, 230, 230, 0.22);
`;

const SButtonContainer = styled.View`
  margin-bottom: 40px;
  width: 100%;
  flex-direction: row;
`;

const SButton = styled(Button)`
  margin: 10px;
  flex: 1;
`;

class TransactionRequest extends Component {
  render() {
    const { callRequest, approveCallRequest, rejectCallRequest } = this.props;
    console.log('TransactionRequest', this.props);
    const tx = callRequest.params[0];
    const txDetails = [
      { label: 'From', value: tx.from },
      { label: 'To', value: tx.to },
      { label: 'Value', value: `${convertAmountFromRawNumber(convertHexToString(tx.value))} ETH` },
      { label: 'Data', value: tx.input || tx.data || '0x' },
    ];
    return (
      <SCard>
        {txDetails.map(txDetail => (
          <STransactionDetailContainer key={txDetail.label}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 6,
              }}
            >
              {txDetail.label}
            </Text>
            <Text
              style={{
                fontFamily: 'Menlo-Regular',
              }}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {txDetail.value}
            </Text>
            <STransactionDetailSeparator />
          </STransactionDetailContainer>
        ))}
        <STransactionDetailContainer>
          <SButtonContainer>
            <SButton onPress={rejectCallRequest}>{'Reject'}</SButton>
            <SButton onPress={approveCallRequest}>{'Approve'}</SButton>
          </SButtonContainer>
        </STransactionDetailContainer>
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
