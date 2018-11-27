import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'react-native';
import Button from '../components/Button';

const SCard = styled.View`
  background-color: rgb(255, 255, 255);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const SMessageDetailContainer = styled.View`
  width: 100%;
  padding: 20px;
  min-height: 77px;
`;

const SMessageDetailSeparator = styled.View`
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

class MessageRequest extends Component {
  render() {
    const { callRequest, approveCallRequest, rejectCallRequest } = this.props;
    const msgDetails = [{ label: 'Address', value: callRequest.params[0] }, { label: 'Message', value: callRequest.params[1] }];
    return (
      <SCard>
        {msgDetails.map(msgDetail => (
          <SMessageDetailContainer key={msgDetail.label}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 6,
              }}
            >
              {msgDetail.label}
            </Text>
            <Text
              style={{
                fontFamily: 'Menlo-Regular',
              }}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {msgDetail.value}
            </Text>
            <SMessageDetailSeparator />
          </SMessageDetailContainer>
        ))}
        <SMessageDetailContainer>
          <SButtonContainer>
            <SButton onPress={rejectCallRequest}>{'Reject'}</SButton>
            <SButton onPress={approveCallRequest}>{'Approve'}</SButton>
          </SButtonContainer>
        </SMessageDetailContainer>
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
