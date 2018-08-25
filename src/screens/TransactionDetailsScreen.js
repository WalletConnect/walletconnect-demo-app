import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { accountGetTransactionDetails } from '../redux/_account';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    padding: 15,
  },
  transactionsContainer: {
    flex: 5,
  },
});

class TransactionDetailsScreen extends Component {
  componentDidMount() {
    this.props.accountGetTransactionDetails(this.props.txHash);
  }

  render() {
    const { loading, txHash, txDetails } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Tx Hash: {txHash}</Text>
        </View>
        <View>{loading ? <Text>{'Loading...'}</Text> : <Text>{JSON.stringify(txDetails)}</Text>}</View>
      </View>
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
