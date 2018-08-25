import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import AssetRow from '../components/AssetRow';
import TransactionRow from '../components/TransactionRow';
import { accountGetTransactions } from '../redux/_account';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  assetHeader: {
    flex: 1,
    padding: 15,
  },
  transactionsContainer: {
    flex: 5,
  },
});

class TransactionHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    const { address, network } = this.props;
    try {
      await this.props.accountGetTransactions(address, network);
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
  }

  render() {
    const {
      navigator, transactions, asset, address,
    } = this.props;
    const _transactions = transactions.filter(tx => tx.asset.address === asset.address);
    console.log({ transactions });
    return (
      <View style={styles.container}>
        <View style={styles.assetHeader}>
          <AssetRow asset={asset} />
        </View>
        <View style={styles.transactionsContainer}>
          <FlatList
            data={_transactions}
            ListEmptyComponent={
              <View style={{ height: 100 }}>
                <Text style={{ color: '#ccc', textAlign: 'center', fontSize: 20 }}>-</Text>
              </View>
            }
            onRefresh={() => this._fetchData()}
            refreshing={this.state.loading}
            keyExtractor={item => item.transactionId}
            renderItem={({ item }) => <TransactionRow tx={item} address={address} navigator={navigator} />}
          />
        </View>
      </View>
    );
  }
}

TransactionHistoryScreen.propTypes = {
  accountGetTransactions: PropTypes.func.isRequired,
  navigator: PropTypes.any.isRequired,
  transactions: PropTypes.array.isRequired,
  asset: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
};

const reduxProps = ({ account }) => ({
  network: account.network,
  address: account.address,
  transactions: account.transactions,
});

export default connect(
  reduxProps,
  { accountGetTransactions },
)(TransactionHistoryScreen);
