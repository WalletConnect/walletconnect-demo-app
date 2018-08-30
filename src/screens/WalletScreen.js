import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Clipboard, ScrollView, View, RefreshControl } from 'react-native';
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
  state={ refreshing: false }
  componentDidMount() {
    this._fetchAccountAssets();
  }
  _fetchAccountAssets() {
    this.props.accountGetAssets();
  }
  _renderAssetRows(assets) {
    if (!assets.length) {
      return null;
    }
    return (
      <Section>
        {assets
          .map((asset, index) => (
            <View key={index}>
              <Separator />
              <AssetRow asset={asset} />
            </View>
          ))}
      </Section>
    );
  }

  render() {
    const { loading, assets, address } = this.props;
    return (
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={this.props.loading}
          onRefresh={this._fetchAccountAssets.bind(this)}
        />}
      >
        <Container>
          <Card>
            <Section style={{ height: 100 }}>
              <Label>{'Wallet Address'}</Label>
              <Text>{address}</Text>
              <Button onPress={() => Clipboard.setString(address)} color="#666666" accessibilityLabel="Copy the address of your wallet to the clipboard">
                {'Copy'}
              </Button>
            </Section>
            <Section style={{ height: 100 }}>
              <Separator />
              <Button
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'WalletConnect.TransactionHistoryScreen',
                    title: 'Transactions',
                    navigatorStyle: {
                      tabBarHidden: true,
                    },
                    backButtonTitle: '',
                  });
                }}
                color="#666666" accessibilityLabel="Go to Transaction History Screen">
                {'Transaction History'}
              </Button>
            </Section>
            {!loading ? (
              this._renderAssetRows(assets)
            ) : (
              <Section>
                <Separator />
                <Label>{'Loading...'}</Label>
              </Section>
            )}
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
