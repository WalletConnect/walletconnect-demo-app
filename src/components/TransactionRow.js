import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { shortenAddress } from '../helpers/utilities';
//import { Icon } from 'react-native-elements';


const styles = StyleSheet.create({
    separator: {
    },
    transactionRow: {
	flex: 1,
	flexDirection: 'row',
	height: 100,
	justifyContent: 'space-between',
	paddingTop: 15,
	paddingLeft: 25,
	paddingRight: 15
    },
    arrow: {
	marginRight: 25,
	marginTop: 5
    }
});


const TransactionRow = ({ tx, navigator, address }) => {
    const exponent = 10 ** Number(tx.asset.decimals);
    const txValue = (Number(tx.value) / exponent).toFixed(4);
    const isTxIncoming = tx.to === address;

    const date = new Date(Number(tx.timeStamp) * 1000).toLocaleString();
    const otherAddress = isTxIncoming ? tx.from : tx.to;

    
    return (
	    <TouchableOpacity
	      onPress={() => {
		// navigator.push({
		//     screen: 'quidwallet.home.wallet.history.TransactionRecordScreen',
		//     passProps: {
		// 	tx
		//     },
		//     navigatorStyle: {
		// 	tabBarHidden: true
		//     },
		//     title: 'Transaction Record', // navigation bar title of the pushed screen (optional)
		//     backButtonTitle: "" // override the back button title (optional)
		// });
	    }}>

	    <View style={styles.transactionRow}>
	    <View style={{ flexDirection: "row" }}>
	    	     <Image
	             source={ isTxIncoming ?  require('../assets//arrow-in.png') : require('../assets//arrow-out.png') } 
	             style={styles.arrow}
	     />

	    <View> 
	    <View style={{flexDirection: 'row'}}>
	    { (tx.txStatus === 'error') ? <Text style={{color: 'red', fontSize:10}}>Fail</Text> : null }		

	    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{shortenAddress(otherAddress, 4)}</Text>
	    </View>
	    { tx.txStatus === 'pending' ? <Text>Pending...</Text> :
	      <Text style={{ color: "grey", }}> { date } </Text>
	    }
      </View>
    </View>
	    <View>
	    <View style={{ alignSelf: 'flex-end' }}>
	    <Text style={{ fontSize: 20 }}>{txValue}</Text>
	    </View>
	    </View>
  </View>
    </TouchableOpacity>

);
}


export default TransactionRow;
