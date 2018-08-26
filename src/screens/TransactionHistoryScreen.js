import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import AssetRow from '../components/AssetRow';
import TransactionRow from '../components/TransactionRow';
import { accountGetTransactions } from '../redux/_account';

const StyledContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledAssetHeader = styled.View`
  flex: 1;
  padding: 15px;
`;

const StyledTransactionsContainer = styled.View`
  flex: 5;
`;

const StyledDash = styled.Text`
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
      navigator, transactions, asset, address, loading,
    } = this.props;
    const _transactions = transactions.filter(tx => tx.asset.address === asset.address);
    console.log({ transactions });
    return (
      <StyledContainer>
        <StyledAssetHeader>
          <AssetRow asset={asset} />
        </StyledAssetHeader>
        <StyledTransactionsContainer>
          <FlatList
            data={_transactions}
            ListEmptyComponent={
              <View style={{ height: 100 }}>
                <StyledDash>-</StyledDash>
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
  asset: PropTypes.object.isRequired,
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
