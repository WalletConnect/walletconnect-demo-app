import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import AssetRow from '../components/AssetRow';
import TransactionRow from '../components/TransactionRow';
import { fetchTransactionsFromApi } from '../redux/_account';


const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: '#fff',
    },
    assetHeader: {
	flex: 1,
	padding: 15
    },
    transactionsContainer: {
	flex: 5
    }
});


class TransactionHistoryScreen extends React.Component {
    
    constructor(props) {
	super(props);
	this.state = {
	    fetching: true
	};
    }
    
    componentDidMount() {
	this._fetchData();
    }

    async _fetchData() {
	try {	    
	    await this.props.fetchTransactionsFromApi(this.props.address, 'mainnet');
	} catch (err) {
	    console.log(err);
	}
	this.setState({fetching: false});
    }
    
    render() {
	const { transactions } = this.props;
	console.log({transactions});
	return (
           <View style={styles.container}>
	     <View style={styles.assetHeader}>
		<AssetRow asset={this.props.asset}/>
	     </View>
	     <View style={styles.transactionsContainer}>
		<FlatList
	          data={this.props.transactions}
	          ListEmptyComponent={
		    <View style={{height: 100}}>
		       <Text style={{color: "#ccc", textAlign: 'center', fontSize: 20}}>-</Text>
		    </View>}
	           onRefresh={() => this._fetchData()}
	           refreshing={this.state.fetching}
	    keyExtractor={(item) => item.transactionId}
	           renderItem={({ item }) => <TransactionRow tx={item} address={this.props.address} navigator={this.props.navigator}/>}
		/>
	    </View>
	</View>
	);
    }
}


export default connect((state, props) => {
    return {
	transactions: state.account.transactions.filter(tx => tx.asset.address === props.asset.address),
	transactionsCount: state.account.transactions.length // to rerender component
    }
}, { fetchTransactionsFromApi })(TransactionHistoryScreen);
