import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Text from '../components/Text';
import { accountGetTransactionDetails } from '../redux/_account';

const StyledContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledHeader = styled.View`
  flex: 1;
  padding: 15px;
`;

class TransactionDetailsScreen extends Component {
  componentDidMount() {
    this.props.accountGetTransactionDetails(this.props.txHash);
  }

  render() {
    const { loading, txHash, txDetails } = this.props;
    return (
      <StyledContainer>
        <StyledHeader>
          <Text color={'#CCCCCC'}>Tx Hash: {txHash}</Text>
        </StyledHeader>
        <StyledContainer>{loading ? <Text>{'Loading...'}</Text> : <Text>{JSON.stringify(txDetails)}</Text>}</StyledContainer>
      </StyledContainer>
    );
  }
}

TransactionDetailsScreen.propTypes = {
  accountGetTransactionDetails: PropTypes.func.isRequired,
  txHash: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  txDetails: PropTypes.object.isRequired,
};

const reduxProps = ({ account }) => ({
  loading: account.loading,
  txDetails: account.txDetails,
});

export default connect(
  reduxProps,
  { accountGetTransactionDetails },
)(TransactionDetailsScreen);
