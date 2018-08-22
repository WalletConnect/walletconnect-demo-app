import React, { Component } from 'react';
import { Clipboard, ScrollView, View } from 'react-native';
import { loadWallet } from '../helpers/wallet';
import { apiGetAccountBalances } from '../helpers/api';
import Container from '../components/Container';
import Card from '../components/Card';
import Section from '../components/Section';
import Text from '../components/Text';
import Label from '../components/Label';
import Button from '../components/Button';
import AssetRow from '../components/AssetRow';


class WalletScreen extends Component {
  state = {
    loading: false,
    wallet: null,
  };
  componentDidMount() {
    this.setState({ loading: true });
    this._loadWallet()
      .then(wallet => this.setState({ loading: false, wallet }))
      .catch(error => this.setState({ loading: false, wallet: null }));
  }
  async _loadWallet()  {
    try {
      const wallet = await loadWallet();
      console.log('wallet', wallet);
	if (wallet) {
        const { data } = await apiGetAccountBalances(wallet.address, 'mainnet');
        const assets = data.map(asset => {
          const exponent = 10 ** Number(asset.contract.decimals);
          const balance = Number(asset.balance) / exponent;
          return {
            address: asset.contract.address,
            name: asset.contract.name,
            symbol: asset.contract.symbol,
            decimals: asset.contract.decimals,
            balance,
          };
        });
        wallet.assets = assets;
        console.log('wallet', wallet);
        return wallet;
      }
      return null;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

    _renderAssetRows() {
	if (!this.state.wallet) { return null; }
	const Separator = (<View style={{height: 1, backgroundColor: '#e9eaeb'}} />);
	
        return this.state.wallet.assets
	    .sort((a,b) => (Number(a.address) - Number(b.address))) // sort by address so that ether is always first
	    .map((asset, index) => (
   	         <View key={index}>
		    { Separator }
		    <AssetRow asset={asset}/>		    
		 </View>
            ));
    }
    
  render() {
    const address = this.state.wallet ? this.state.wallet.address : '';
      return !this.state.loading ? (
    <ScrollView>
      <Container>
        <Card>
              <Section style={{height: 100}}>
            <Label>{'Wallet Address'}</Label>
            <Text>{address}</Text>
            <Button onPress={() => Clipboard.setString(address)} color="#666666" accessibilityLabel="Copy the address of your wallet to the clipboard">
              {'Copy'}
            </Button>
              </Section>
	      <Section>	      
              { this._renderAssetRows() }
	  </Section>	  
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

export default WalletScreen;
