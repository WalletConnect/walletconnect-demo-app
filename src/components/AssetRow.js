import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

const styles = StyleSheet.create({
    assetRow: {
	flexDirection: 'row',
	height: 80,
    },
    balanceContainer: {
	flexDirection: "column",
	alignItems: 'flex-end'
    },
    balance: {
	marginTop: 20,
	marginRight: 11,
	color: '#242836',
	lineHeight: 20 
    },
    symbol: {
	color: '#242836',
	letterSpacing: 1,
	lineHeight: 20
    },
    circleIcon: {
	height: 30,
	width: 30,
	borderRadius: 15,
	margin: 2
    },
    circle: {
	marginLeft: 14,
	height: 36,
	width: 36,
	marginRight: 15,
	borderRadius: 18,
	borderColor: "#d4d4d7",
	borderWidth: 1,
	backgroundColor: "#fff"
    },
    assetSymbolContent: {
	flex: 1,
	flexDirection: "row",
	alignItems: 'center',
    },
    
});


class AssetIcon extends React.PureComponent {

    _getIconUrl(address) {
	// if ether
	if (!address) {
	    return 'https://github.com/TrustWallet/tokens/raw/master/coins/60.png';
	}
	// if tokens
	return `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${address}.png`;
    }
    
    render() {
	const { symbol, address } = this.props.asset;
	
	return (
	    <View style={styles.circle}>
		<ImageLoad
	           source={{uri: this._getIconUrl(address)}}
   	           style={styles.circleIcon}
  	           isShowActivity={false}
	           placeholderSource={require('../assets/default_token.png')}
	           customImagePlaceholderDefaultStyle={styles.circleIcon}
	           loadingStyle={styles.circleIcon}
	           borderRadius={15}
	           placeholderStyle={styles.circleIcon}
		/>
   	     </View>
		
	);
    }
}



const AssetRow = ({ asset }) => {    
    return (
	    <View style={styles.assetRow}>
	      <View style={styles.assetSymbolContent}>
     	        <AssetIcon asset={asset} />
	        <Text style={styles.symbol}>{asset.symbol}</Text>
	      </View>
	      <View style={styles.centeredFlexEnd}>
	        <Text style={styles.balance}>{Number(asset.balance).toFixed(8)}</Text>
	      </View>
	    </View>
    );
}


export default AssetRow;
