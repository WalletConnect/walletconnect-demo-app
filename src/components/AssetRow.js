import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import AssetIcon from './AssetIcon';

const styles = StyleSheet.create({
  assetRow: {
    flexDirection: 'row',
    height: 80,
  },
  balance: {
    marginTop: 30,
    marginRight: 11,
    color: '#242836',
    lineHeight: 20,
  },
  symbol: {
    color: '#242836',
    letterSpacing: 1,
    lineHeight: 20,
  },
  assetSymbolContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const AssetRow = ({ asset }) => (
  <View style={styles.assetRow}>
    <View style={styles.assetSymbolContent}>
      <AssetIcon asset={asset} />
      <Text style={styles.symbol}>{asset.symbol}</Text>
    </View>
    <View>
      <Text style={styles.balance}>{Number(asset.balance).toFixed(8)}</Text>
    </View>
  </View>
);

AssetRow.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default AssetRow;
