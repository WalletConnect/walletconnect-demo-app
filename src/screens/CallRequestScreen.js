import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StatusBar } from 'react-native';
import { hideActiveModal } from '../navigation';
import { sendTransaction, signMessage } from '../helpers/wallet';
import { getCallRequest } from '../redux/_callRequests';
import { walletConnectApproveCallRequest, walletConnectRejectCallRequest } from '../helpers/walletconnect';
import TransactionRequest from '../components/TransactionRequest';
import MessageRequest from '../components/MessageRequest';

const SContainer = styled.View`
  flex: 1;
  background-color: rgb(0, 0, 0);
  justify-content: flex-end;
`;

const SHeaderContainer = styled.View`
  flex: 1;
`;

const SHeaderTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SHeaderText = styled.Text`
  color: white;
  font-size: 20px;
  opacity: 0.8;
`;

const SCloseModal = styled.Text`
  color: white;
  margin: 10px;
  align-self: flex-end;
`;

const SConfirmationContainer = styled.View``;

class CallRequestScreen extends Component {
  state = {
    confirmed: false,
    callRequest: null,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    this.showNewTransaction();
  }

  showNewTransaction = () => {
    const callRequest = getCallRequest(this.props.sessionId, this.props.callId);
    console.log('showNewTransaction callRequest', callRequest);
    console.log('callRequest', callRequest);
    this.setState({ callRequest });
  };

  approveCallRequest = async () => {
    const { callRequest } = this.state;
    let result = null;

    switch (callRequest.method) {
    case 'eth_sendTransaction':
      try {
        const signedTx = await sendTransaction(callRequest.params[0]);
        result = signedTx.hash;
        console.log('eth_sendTransaction result', result);
      } catch (error) {
        console.error(error);
      }
      break;

    case 'eth_sign':
      try {
        result = await signMessage(callRequest.params[1]);
        console.log('eth_sign result', result);
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      break;
    }

    if (result) {
      await walletConnectApproveCallRequest(this.props.sessionId, this.props.callId, { result });
      this.onClose();
      this.setState(() => ({ confirmed: true, callRequest: null }));
    } else {
      this.rejectCallRequest();
    }
  };

  rejectCallRequest = async () => {
    await walletConnectRejectCallRequest(this.props.sessionId, this.props.callId);
    this.setState(() => ({ confirmed: false }));
  };

  onClose() {
    StatusBar.setBarStyle('dark-content', true);
    hideActiveModal();
  }

  renderCallRequest = () => {
    const { callRequest } = this.state;
    if (callRequest) {
      switch (callRequest.method) {
      case 'eth_sendTransaction':
        return (
          <TransactionRequest
            callRequest={callRequest}
            approveCallRequest={this.approveCallRequest}
            rejectCallRequest={this.rejectCallRequest}
          />
        );
      case 'eth_sign':
        return (
          <MessageRequest
            callRequest={callRequest}
            approveCallRequest={this.approveCallRequest}
            rejectCallRequest={this.rejectCallRequest}
          />
        );

      default:
        return null;
      }
    } else {
      return null;
    }
  };

  render() {
    return (
      <SContainer>
        <SHeaderContainer>
          <SHeaderTextContainer>
            <SHeaderText>{`New Request from ${this.props.dappName}`}</SHeaderText>
          </SHeaderTextContainer>
          <SCloseModal onPress={this.onClose}>{'Close'}</SCloseModal>
        </SHeaderContainer>
        <SConfirmationContainer>{this.renderCallRequest()}</SConfirmationContainer>
      </SContainer>
    );
  }
}

CallRequestScreen.propTypes = {
  navigation: PropTypes.any,
  sessionId: PropTypes.string.isRequired,
  callId: PropTypes.string.isRequired,
  dappName: PropTypes.string.isRequired,
};

export default CallRequestScreen;
