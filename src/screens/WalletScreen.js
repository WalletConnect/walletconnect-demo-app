import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Image, TouchableHighlight, Clipboard, ScrollView, View, RefreshControl } from 'react-native';
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
  _copyToClipboard = () => {
    const { address } = this.props;
    Clipboard.setString(address);
    Alert.alert('Copied', 'Address copied to clipboard');
  };
  _fetchAccountAssets = () => {
    if (this.props.address) {
      this.props.accountGetAssets();
    }
  };
  _renderAssetRows = () => {
    const { assets } = this.props;
    console.log(assets);
    if (!assets.length) {
      return null;
    }
    return (
      <Section>
        {assets.map((asset, index) => (
          <View key={index}>
            <Separator />
            <AssetRow asset={asset} />
          </View>
        ))}
      </Section>
    );
  };

  render() {
    const { loading, address, navigator } = this.props;
    const refreshControl = <RefreshControl refreshing={loading} onRefresh={this._fetchAccountAssets} />;
    return (
      <ScrollView refreshControl={refreshControl}>
        <Container>
          <Card>
            <View style={{ flexDirection: 'row', height: 50 }}>
              <Section style={{ width: 'auto', height: 50, flex: 10 }}>
                <Label>{'Wallet Address'}</Label>
                <Text style={{ fontSize: 12, fontFamily: 'Menlo-Regular' }}>{address}</Text>
              </Section>
              <Section
                style={{
                  width: 'auto',
                  height: 50,
                  flex: 1,
                }}
              >
                <TouchableHighlight onPress={this._copyToClipboard}>
                  <Image
                    source={
                      require('../assets/clipboard.png') // eslint-disable-line
                    }
                    style={{ width: 20, height: 20, margin: 5 }}
                  />
                </TouchableHighlight>
              </Section>
            </View>

            <Section style={{ height: 50 }}>
              <Button
                onPress={() => {
                  navigator.push({
                    screen: 'WalletConnect.TransactionHistoryScreen',
                    title: 'Transactions',
                    navigatorStyle: {
                      tabBarHidden: true,
                    },
                    backButtonTitle: '',
                  });
                }}
                color="#666666"
                accessibilityLabel="Go to Transactions Screen"
              >
                {'Transactions'}
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
