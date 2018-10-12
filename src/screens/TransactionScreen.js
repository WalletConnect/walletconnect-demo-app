import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TouchID from 'react-native-touch-id';
import styled from 'styled-components';
import { StatusBar, AlertIOS } from 'react-native';
import { hideActiveModal } from '../navigation';
import Button from '../components/Button';
import { sendTransaction } from '../helpers/wallet';
import { getCallRequest } from '../redux/_callRequests';
import { walletConnectApproveCallRequest, walletConnectGetSessionData } from '../helpers/walletConnect';

const SContainer = styled.View`
  flex: 1;
  background-color: rgb(0, 0, 0);
`;

const STopContainer = styled.View`
  padding-top: 128px;
  justify-content: center;
  align-items: center;
`;

const SVendorLogo = styled.Image`
  width: 25px;
  height: 40px;
  margin: 0 auto;
  align-self: stretch;
`;

const SVendorName = styled.Text`
  margin-top: 16px;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 4px;
  color: rgb(255, 255, 255);
  letter-spacing: 0.2px;
`;

const SRequestText = styled.Text`
  color: rgb(255, 255, 255);
  font-size: 17px;
  opacity: 0.78;
`;

const SBottomContainer = styled.View`
  position: absolute;
  bottom: 0;
  align-self: flex-end;
  width: 100%;
  height: 480px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: rgb(255, 255, 255);
`;

const STransactionDetailContainer = styled.View`
  position: relative;
  width: 100%;
  height: 77px;
`;

const STransactionDetailTitle = styled.Text`
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
  position: absolute;
  left: 18px;
  top: 38px;
  width: 176px;
  height: 19px;
  font-size: 16px;
  color: rgba(60, 66, 82, 0.6);
`;

const STransactionDetailSeparator = styled.View`
  position: absolute;
  left: 18px;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(230, 230, 230, 0.22);
`;

const SCurrencyNameText = styled.Text`
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
  position: absolute;
  left: 19px;
  top: 53px;
  width: 50%;
  height: 16px;
  font-size: 14px;
  color: rgba(60, 66, 82, 0.6);
`;

const SConfirmButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SCloseModal = styled.Text`
  color: #5376ff;
  font-size: 17px;
  position: absolute;
  top: 15px;
  right: 16px;
`;

const SFaceID = styled.Image`
  position: absolute;
  width: 32px;
  height: 32px;
  transform: translateX(-91px) translateY(-6px);
`;

class TransactionScreen extends Component {
  state = {
    dappName: '',
    confirmed: false,
    callRequest: null,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    console.log('TransactionScreen', this.props);
    this.getDappName();
    this.showNewTransaction();
  }

  getDappName = () => {
    const { dappName } = walletConnectGetSessionData(this.props.sessionId);
    this.setState({ dappName });
  };

  showNewTransaction = () => {
    const callRequest = getCallRequest(this.props.sessionId, this.props.callId);
    console.log('showNewTransaction callRequest', callRequest);
    console.log('callRequest', callRequest);
    this.setState({ callRequest });
  };

  confirmTransaction = () =>
    TouchID.authenticate('Confirm callRequest')
      .then(async success => {
        console.log('success', success);
        const transaction = this.state.callRequest.params[0];
        const transactionReceipt = await sendTransaction(transaction);
        if (transactionReceipt && transactionReceipt.hash) {
          await walletConnectApproveCallRequest(this.props.callId, transactionReceipt.hash);
          this.onClose();
          this.setState(() => ({ confirmed: true, callRequest: null }));
        } else {
          await walletConnectApproveCallRequest(false, null);
          this.setState(() => ({ confirmed: false }));
        }
      })
      .catch(error => {
        console.log('error', error);
        AlertIOS.alert('Authentication Failed');
      });

  onClose() {
    StatusBar.setBarStyle('dark-content', true);
    hideActiveModal();
  }

  render() {
    const transaction = this.state.callRequest ? this.state.callRequest.params[0] : null;
    return (
      <SContainer>
        <SContainer>
          <STopContainer>
            {/* eslint-disable-next-line */}
            <SVendorLogo source={require('../assets/ethereum.png')} />
            <SVendorName>{this.state.dappName}</SVendorName>
            <SRequestText>{'New Request'}</SRequestText>
          </STopContainer>
          {transaction && (
            <SBottomContainer>
              <SCloseModal onPress={this.onClose}>Cancel</SCloseModal>
              <STransactionDetailContainer>
                <STransactionDetailTitle>FROM</STransactionDetailTitle>
                <STransactionDetailText>{transaction.from}</STransactionDetailText>
                <SCloseModal onPress={this.onClose}>Cancel</SCloseModal>
                <STransactionDetailSeparator />
              </STransactionDetailContainer>
              <STransactionDetailContainer>
                <STransactionDetailTitle>TO</STransactionDetailTitle>
                <STransactionDetailText>{transaction.to}</STransactionDetailText>
                <STransactionDetailSeparator />
              </STransactionDetailContainer>
              <STransactionDetailContainer>
                <SCurrencyNameText>{this.props.currencyName}</SCurrencyNameText>
                <SAmountText>{transaction.value}</SAmountText>
                {/* <SConvertedAmountText>{this.props.convertedAmount}</SConvertedAmountText> */}
              </STransactionDetailContainer>
              <SConfirmButtonContainer>
                <Button onPress={() => this.confirmTransaction()}>
                  {/* eslint-disable-next-line */}
                  <SFaceID source={require('../assets/faceid.png')} />Confirm with FaceID
                </Button>
              </SConfirmButtonContainer>
            </SBottomContainer>
          )}
        </SContainer>
      </SContainer>
    );
  }
}

TransactionScreen.propTypes = {
  navigation: PropTypes.any,
  sessionId: PropTypes.string.isRequired,
  callId: PropTypes.string.isRequired,
  convertedAmount: PropTypes.string,
  currencyName: PropTypes.string,
};

TransactionScreen.defaultProps = {
  currencyName: 'AVO',
  convertedAmount: 'TBD',
};

export default TransactionScreen;
