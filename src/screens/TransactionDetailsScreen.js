import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, Linking } from 'react-native';
import { apiGetTransactionDetails } from '../helpers/api';


class TransactionDetailsScreen extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	};
    }
    
    
    componentDidMount() {
	// #TODO fetch tx details
    }

    render() {
	console.log(this.props);
	
	return (
		<View>
		  <Text>Tx Hash: { this.props.txHash}</Text>
		</View>
	);
    }    
}


export default connect((state, props) => ({
    walletAddress: state.account.address
}))(TransactionDetailsScreen);
