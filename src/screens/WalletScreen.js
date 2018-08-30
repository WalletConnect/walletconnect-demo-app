import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Clipboard, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Container from '../components/Container';
import Card from '../components/Card';
import Section from '../components/Section';
import Separator from '../components/Separator';
import Text from '../components/Text';
import Label from '../components/Label';
import Button from '../components/Button';
import AssetRow from '../components/AssetRow';
import { accountGetAssets } from '../redux/_account';

class WalletScreen extends Component {
  componentDidMount() {
    this._fetchAccountAssets();
  }
  _fetchAccountAssets = () => {
    if (this.props.address) {
      this.props.accountGetAssets();
    }
  };
  _renderAssetRows = () => {
    const { assets, navigator } = this.props;
    console.log(assets);
    if (!assets.length) {
      return null;
    }
    return (
      <Section>
        {assets
          .sort((a, b) => Number(a.address) - Number(b.address)) // sort by address so that ether is always first
          .map((asset, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigator.push({
                  screen: 'WalletConnect.TransactionHistoryScreen',
                  passProps: { asset },
                  title: `${asset.symbol} Transactions`,
                  navigatorStyle: {
                    tabBarHidden: true,
                  },
                  backButtonTitle: '',
                });
              }}
            >
              <Separator />
              <AssetRow asset={asset} />
            </TouchableOpacity>
          ))}
      </Section>
    );
  };

  render() {
    const { loading, address } = this.props;
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={this._fetchAccountAssets} />}>
        <Container>
          <Card>
            <Section style={{ height: 100 }}>
              <Label>{'Wallet Address'}</Label>
              <Text>{address}</Text>
              <Button onPress={() => Clipboard.setString(address)} color="#666666" accessibilityLabel="Copy the address of your wallet to the clipboard">
                {'Copy'}
              </Button>
            </Section>
            {this._renderAssetRows()}
          </Card>
        </Container>
      </ScrollView>
    );
  }
}

WalletScreen.propTypes = {
  navigator: PropTypes.any.isRequired,
  accountGetAssets: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};

const reduxProps = ({ account }) => ({
  loading: account.loading,
  address: account.address,
  assets: account.assets,
});

export default connect(
  reduxProps,
  { accountGetAssets },
)(WalletScreen);
