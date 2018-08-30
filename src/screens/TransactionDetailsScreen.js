import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Image, Linking } from 'react-native';
import { accountGetTransactionDetails } from '../redux/_account';
import { convertAmountFromRawNumber, multiply, convertStringToNumber } from '../helpers/bignumber';


const StyledContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 15px;
`;

const StyledTitle = styled.Text`
  font-size: 20;
`;

const StyledColumn = styled.View`
  flex: ${({ flex = 1 }) => flex};
`;

const StyledArrowRow = styled.View`
  margin-top: 20;
  margin-bottom: 35;
  flex-direction: row;
`;

const StyledArrowCell = styled.View`
  margin-top: 5;
  flex: 1;
  align-items: center;
`;

const StyledLabel = styled.Text`
  font-size: 13;
  margin-top: 6;
  margin-bottom: 8;
  font-weight: 400;
`;

const StyledText = styled.Text`
  color: ${({ color = '#333333' }) => color};
  font-size: 13;
  margin-bottom: 8;
  margin-top: 6;
`;

const StyledDirectionLabel = styled.Text`
   fontSize: 13;
   fontWeight: 500;
   color: #24283666;
   margin-top: 10;
`;

const StyledRow = styled.View`
  flex-direction: row;
`;

const StyledSection = styled.View`
  margin-bottom: 15;
  margin-top: 15;
`;

const StyledLink = styled.Text`
  text-decoration-line: underline;
  font-size: 13;
  margin-top: 6;
  margin-bottom: 8;
`;


class TransactionDetailsScreen extends Component {
  componentDidMount() {
    this.props.accountGetTransactionDetails(this.props.txHash);
  }

  _renderArrowRow() {
    const { txDetails, address } = this.props;
    const txValue = convertAmountFromRawNumber(txDetails.value, 18);
    const isTxIncoming = txDetails.to === address;
    const directionLabel = isTxIncoming ? 'received' : 'sent';
    const titleText = `${txValue} ETH ${directionLabel}`;

    return (
      <StyledArrowRow>
        <StyledArrowCell>
          <Image
            source={
              isTxIncoming
                    ? require('../assets//arrow-in.png') // eslint-disable-line
                    : require('../assets//arrow-out.png') // eslint-disable-line
            }
          />
        </StyledArrowCell>
        <StyledColumn flex={5}>
          <StyledTitle>{titleText}</StyledTitle>
        </StyledColumn>
      </StyledArrowRow>
    );
  }

  render() {
    const {
      loading, txHash, txDetails, network,
    } = this.props;

    const txStatus = txDetails.error === '' ? 'Success' : 'Fail';
    const txStatusColor = (txStatus === 'Success') ? '#00BF19' : '#E33E59';

    const gasPriceInGwei = convertAmountFromRawNumber(txDetails.gasPrice, 9);
    const gasCost = convertAmountFromRawNumber(multiply(txDetails.gasPrice, txDetails.gasUsed), 18);
    const date = new Date(convertStringToNumber(multiply(txDetails.timeStamp, 1000))).toLocaleString();

    // get link to etherscan for tx details
    const etherscanSubdomain = network === 'mainnet' ? '' : `${network}.`;
    const etherscanLink = `https://${etherscanSubdomain}etherscan.io/tx/${txHash}`;

    if (loading) {
      return (
        <StyledContainer>
          <StyledText>{'Loading...'}</StyledText>
        </StyledContainer>
      );
    }

    // when tx tx details loaded
    return (
      <StyledContainer>
        { this._renderArrowRow() }
        <StyledRow>
          <StyledSection>
            <StyledDirectionLabel>From:</StyledDirectionLabel>
            <StyledText>{txDetails.from}</StyledText>
            <StyledDirectionLabel>To:</StyledDirectionLabel>
            <StyledText>{txDetails.to}</StyledText>
          </StyledSection>
        </StyledRow>
        <StyledRow>
          <StyledColumn flex={2}>
            <StyledSection>
              <StyledLabel>Tx Status:</StyledLabel>
              <StyledLabel>Gas Limit:</StyledLabel>
              <StyledLabel>Gas Used:</StyledLabel>
              <StyledLabel>Gas Price:</StyledLabel>
              <StyledLabel>Tx Cost:</StyledLabel>
            </StyledSection>
            <StyledSection>
              <StyledLabel>Tx time:</StyledLabel>
              <StyledLabel>Block #:</StyledLabel>
              <StyledLabel>Tx hash:</StyledLabel>
            </StyledSection>
          </StyledColumn>
          <StyledColumn flex={5}>
            <StyledSection>
              <StyledText color={txStatusColor}>{txStatus}</StyledText>
              <StyledText>{txDetails.gas}</StyledText>
              <StyledText>{txDetails.gasUsed}</StyledText>
              <StyledText>{gasPriceInGwei} Gwei</StyledText>
              <StyledText>{gasCost} Ether</StyledText>
            </StyledSection>
            <StyledSection>
              <StyledText>{date}</StyledText>
              <StyledText>{txDetails.blockNumber}</StyledText>
              <StyledLink onPress={() => Linking.openURL(etherscanLink).catch(() => null)}>{txHash}</StyledLink>
            </StyledSection>
          </StyledColumn>
        </StyledRow>
      </StyledContainer>
    );
  }
}

TransactionDetailsScreen.propTypes = {
  accountGetTransactionDetails: PropTypes.func.isRequired,
  txHash: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  txDetails: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
};

const reduxProps = ({ account }) => ({
  loading: account.loading,
  txDetails: account.txDetails,
  address: account.address,
  network: account.network,
});

export default connect(
  reduxProps,
  { accountGetTransactionDetails },
)(TransactionDetailsScreen);
