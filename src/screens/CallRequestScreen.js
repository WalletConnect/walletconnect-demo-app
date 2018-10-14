import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StatusBar } from 'react-native';
import { hideActiveModal } from '../navigation';
import { sendTransaction } from '../helpers/wallet';
import { getCallRequest } from '../redux/_callRequests';
import { walletConnectApproveCallRequest, walletConnectRejectCallRequest } from '../helpers/walletConnect';
import TransactionRequest from '../components/TransactionRequest';

const SContainer = styled.View`
  flex: 1;
  background-color: rgb(0, 0, 0);
`;

const SHeaderText = styled.Text`
  font-size: 17px;
  opacity: 0.78;
`;

const SCloseModal = styled.Text`
  color: #5376ff;
  font-size: 17px;
  position: absolute;
  top: 15px;
  right: 16px;
`;

const SConfirmationContainer = styled.View`
  flex: 1;
`;

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
      result = await sendTransaction(callRequest.params[0]);
      break;
    default:
      break;
    }

    if (result) {
      await walletConnectApproveCallRequest(this.props.sessionId, this.props.callId, result);
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
        <SCloseModal onPress={this.onClose}>{'Cancel'}</SCloseModal>
        <SHeaderText>{`New Request from ${this.props.dappName}`}</SHeaderText>
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
