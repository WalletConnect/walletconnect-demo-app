import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { shortenAddress } from '../helpers/utilities';
//import { Icon } from 'react-native-elements';


const styles = StyleSheet.create({
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
    },
    errorLabel: {
	color: 'red',
	fontSize:10
    },
    row: {
	flexDirection: "row"
    },
    address: {
	fontSize: 16,
	fontWeight: "bold"
    },
    date: {
	color: "grey",
    },
    flexEnd: { alignSelf: 'flex-end' },
    value: { fontSize: 20 }
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
		navigator.push({
		    screen: 'WalletConnect.TransactionDetailsScreen',
		    passProps: {
			txHash: tx.txHash
		    },
		    navigatorStyle: {
			tabBarHidden: true
		    },
		    title: 'Transaction Details', // navigation bar title of the pushed screen (optional)
		    backButtonTitle: "" // override the back button title (optional)
		});
	      }}>

	    <View style={styles.transactionRow}>
	    <View style={styles.row}>
	    	     <Image
	             source={ isTxIncoming ?  require('../assets//arrow-in.png') : require('../assets//arrow-out.png') } 
	             style={styles.arrow}
	     />

	    <View> 
	    <View style={styles.row}>
	    { (tx.txStatus === 'error') ? <Text style={styles.errorLabel}>Fail</Text> : null }		

	    <Text style={styles.address}>{shortenAddress(otherAddress, 4)}</Text>
	    </View>
	    { tx.txStatus === 'pending' ? <Text>Pending...</Text> :
	      <Text style={styles.date}> { date } </Text>
	    }
      </View>
    </View>
	    <View>
	    <View style={styles.flexEnd}>
	       <Text style={styles.value}>{txValue}</Text>
	    </View>
	    </View>
  </View>
    </TouchableOpacity>
);
}


export default TransactionRow;
