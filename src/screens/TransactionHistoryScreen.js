import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import TransactionRow from '../components/TransactionRow';
import { accountGetTransactions } from '../redux/_account';

const StyledContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledTransactionsContainer = styled.View`
  flex: 5;
`;

const StyledNoTxsText = styled.Text`
  color: #ccc;
  text-align: center;
  font-size: 20px;
`;

class TransactionHistoryScreen extends Component {
  componentDidMount() {
    const { address, network } = this.props;
    this.props.accountGetTransactions(address, network);
  }

  render() {
    const {
      navigator, transactions, address, loading,
    } = this.props;
    console.log({ transactions });

    return (
      <StyledContainer>
        <StyledTransactionsContainer>
          <FlatList
            data={transactions}
            ListEmptyComponent={
              <View style={{ height: 100, marginTop: 50 }}>
                <StyledNoTxsText>No Transactions yet</StyledNoTxsText>
              </View>
            }
            onRefresh={() => this._fetchData()}
            refreshing={loading}
            keyExtractor={item => item.transactionId}
            renderItem={({ item }) => <TransactionRow tx={item} address={address} navigator={navigator} />}
          />
        </StyledTransactionsContainer>
      </StyledContainer>
    );
  }
}

TransactionHistoryScreen.propTypes = {
  accountGetTransactions: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  network: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
};

const reduxProps = ({ account }) => ({
  loading: account.loading,
  network: account.network,
  address: account.address,
  transactions: account.transactions,
});

export default connect(
  reduxProps,
  { accountGetTransactions },
)(TransactionHistoryScreen);
