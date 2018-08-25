import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Clipboard, ScrollView, View, TouchableOpacity } from 'react-native';
import Container from '../components/Container';
import Card from '../components/Card';
import Section from '../components/Section';
import Text from '../components/Text';
import Label from '../components/Label';
import Button from '../components/Button';
import AssetRow from '../components/AssetRow';
import { accountGetAssets } from '../redux/_account';

class WalletScreen extends Component {
  componentDidMount() {
    this.props.accountGetAssets();
  }
  _renderAssetRows(assets) {
    if (!assets.length) {
      return null;
    }
    const Separator = <View style={{ height: 1, backgroundColor: '#e9eaeb' }} />;

    return (
      <Section>
        {assets
          .sort((a, b) => Number(a.address) - Number(b.address)) // sort by address so that ether is always first
          .map((asset, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.props.navigator.push({
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
              {Separator}
              <AssetRow asset={asset} />
            </TouchableOpacity>
          ))}
      </Section>
    );
  }

  render() {
    const { loading, assets, address } = this.props;
    return !loading ? (
      <ScrollView>
        <Container>
          <Card>
            <Section style={{ height: 100 }}>
              <Label>{'Wallet Address'}</Label>
              <Text>{address}</Text>
              <Button onPress={() => Clipboard.setString(address)} color="#666666" accessibilityLabel="Copy the address of your wallet to the clipboard">
                {'Copy'}
              </Button>
            </Section>
            {this._renderAssetRows(assets)}
          </Card>
        </Container>
      </ScrollView>
    ) : (
      <Container>
        <Card>
          <Section>
            <Label>Loading...</Label>
          </Section>
        </Card>
      </Container>
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
