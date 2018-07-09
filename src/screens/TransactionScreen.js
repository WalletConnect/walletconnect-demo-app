import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TouchID from 'react-native-touch-id';
import styled from 'styled-components';
import { StatusBar, AlertIOS } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Button from '../components/Button';
import * as ethWallet from '../model/ethWallet';
import { getTransactionToApprove } from '../model/transactions';
import { walletConnectSendTransactionHash } from '../model/walletconnect';

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

const SRequestPayment = styled.Text`
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
    confirmed: false,
    transaction: null,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    this.showNewTransaction();
  }

  showNewTransaction = () => {
    const transaction = getTransactionToApprove();
    console.log('transaction', transaction);
    this.setState({ transaction });
  };

  confirmTransaction = () =>
    TouchID.authenticate('Confirm transaction')
      .then(async success => {
        console.log('success', success);
        const { transaction } = this.state;
        const transactionReceipt = await ethWallet.sendTransaction(transaction.transactionData);
        if (transactionReceipt && transactionReceipt.hash) {
          await walletConnectSendTransactionHash(transaction.transactionId, true, transactionReceipt.hash);
          this.onClose();
          this.setState(() => ({ confirmed: true, transaction: null }));
        } else {
          await walletConnectSendTransactionHash(false, null);
          this.setState(() => ({ confirmed: false }));
        }
      })
      .catch(error => {
        console.log('error', error);
        AlertIOS.alert('Authentication Failed');
      });

  onClose() {
    StatusBar.setBarStyle('dark-content', true);
    Navigation.dismissModal({
      animationType: 'slide-down',
    });
  }

  render() {
    return (
      <SContainer>
        <SContainer>
          <STopContainer>
            {/* eslint-disable-next-line */}
            <SVendorLogo source={require('../assets/ethereum.png')} />
            <SVendorName>{'Ethereum Store'}</SVendorName>
            <SRequestPayment>{'Request for payment'}</SRequestPayment>
          </STopContainer>
          <SBottomContainer>
            {/* eslint-disable-next-line */}
            <SCloseModal onPress={this.onClose}>Cancel</SCloseModal>
            <STransactionDetailContainer>
              <STransactionDetailTitle>FROM</STransactionDetailTitle>
              <STransactionDetailText>{this.state.transaction.transactionData.from}</STransactionDetailText>
              <SCloseModal onPress={this.onClose}>Cancel</SCloseModal>
              <STransactionDetailSeparator />
            </STransactionDetailContainer>
            <STransactionDetailContainer>
              <STransactionDetailTitle>TO</STransactionDetailTitle>
              <STransactionDetailText>{this.state.transaction.transactionData.to}</STransactionDetailText>
              <STransactionDetailSeparator />
            </STransactionDetailContainer>
            <STransactionDetailContainer>
              <SCurrencyNameText>{this.props.currencyName}</SCurrencyNameText>
              <SAmountText>{this.state.transaction.transactionData.value}</SAmountText>
              {/* <SConvertedAmountText>{this.props.convertedAmount}</SConvertedAmountText> */}
            </STransactionDetailContainer>
            <SConfirmButtonContainer>
              <Button onPress={() => this.confirmTransaction()}>
                {/* eslint-disable-next-line */}
                <SFaceID source={require('../assets/faceid.png')} />Confirm with FaceID
              </Button>
            </SConfirmButtonContainer>
          </SBottomContainer>
        </SContainer>
      </SContainer>
    );
  }
}

TransactionScreen.propTypes = {
  navigation: PropTypes.any,
  transaction: PropTypes.any,
  convertedAmount: PropTypes.string,
  currencyName: PropTypes.string,
};

TransactionScreen.defaultProps = {
  fromAddress: 'fake address',
  toAddress: 'fake address',
  currencyName: 'AVO',
  convertedAmount: 'TBD',
};

export default TransactionScreen;
