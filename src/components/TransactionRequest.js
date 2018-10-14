import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/Button';
import { convertAmountFromRawNumber, convertHexToString } from '../helpers/bignumber';

const SCard = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  align-self: flex-end;
  width: 100%;
  flex: 1;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: rgb(255, 255, 255);
`;

const STransactionDetailContainer = styled.View`
  width: 100%;
  position: relative;
  width: 100%;
  height: 77px;
`;

const STransactionDetailTitle = styled.Text`
  width: 100%;
  position: absolute;
  top: 19px;
  left: 18px;
  width: 38px;
  height: 14px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: rgba(45, 45, 49, 0.7);
`;

const STransactionDetailText = styled.Text`
  width: 100%;
  position: absolute;
  left: 18px;
  top: 38px;
  width: 176px;
  height: 19px;
  font-size: 16px;
  color: rgba(60, 66, 82, 0.6);
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

const SCurrencyNameText = styled.Text`
  width: 100%;
  position: absolute;
  left: 19px;
  top: 27px;
  width: 50%;
  height: 19px;
  font-size: 16px;
  font-weight: 600;
  color: rgb(45, 45, 49);
`;

const SAmountText = styled.Text`
  width: 100%;
  position: absolute;
  left: 19px;
  top: 53px;
  width: 50%;
  height: 16px;
  font-size: 14px;
  color: rgba(60, 66, 82, 0.6);
`;

const SButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 45px;
`;

class TransactionRequest extends Component {
  render() {
    const { callRequest, approveCallRequest, rejectCallRequest } = this.props;
    console.log('TransactionRequest', this.props);
    const tx = callRequest.params[0];
    return (
      <SCard>
        <STransactionDetailContainer>
          <STransactionDetailTitle>{'FROM'}</STransactionDetailTitle>
          <STransactionDetailText>{tx.from}</STransactionDetailText>
          <STransactionDetailSeparator />
        </STransactionDetailContainer>
        <STransactionDetailContainer>
          <STransactionDetailTitle>{'To'}</STransactionDetailTitle>
          <STransactionDetailText>{tx.to}</STransactionDetailText>
          <STransactionDetailSeparator />
        </STransactionDetailContainer>
        <STransactionDetailContainer>
          <SCurrencyNameText>{'Value'}</SCurrencyNameText>
          <SAmountText>{`${convertAmountFromRawNumber(convertHexToString(tx.value))} ETH`}</SAmountText>
        </STransactionDetailContainer>
        <SButtonContainer>
          <Button onPress={rejectCallRequest}>{'Reject'}</Button>
        </SButtonContainer>
        <SButtonContainer>
          <Button onPress={approveCallRequest}>{'Approve'}</Button>
        </SButtonContainer>
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
