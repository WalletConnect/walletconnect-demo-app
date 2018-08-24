import { apiGetTransactionData } from '../helpers/api';

// -- Constants ------------------------------------------------------------- //
const TRANSACTIONS_ADD_MANY = 'transactions/TRANSACTIONS_ADD_MANY';



// -- Actions --------------------------------------------------------------- //
export const fetchTransactionsFromApi = (address, network) => {    
    return async (dispatch, getState) => {
	
	try { 
	    const { data } =  await apiGetTransactionData(address, network);
	    const transactions = [];
	    
	    data.docs.map(doc => {
		if (doc.operations) {		    
		    // token transfers		    
		    doc.operations
		        .filter(op => op.type === 'token_transfer')
			.map(op => {
  			const tokenTx = {
			    transactionId: op.transactionId,
			    asset: {
				symbol: op.contract.symbol,
				decimals: op.contract.decimals,
				address: op.contract.address,
				name: op.contract.name
			    },
			    timeStamp: doc.timeStamp,
			    value: op.value,
			    to: op.to,
			    from: op.from,
			    txHash: doc._id,
			    txStatus: "success"
			};
			transactions.push(tokenTx);
		    });		
		
		// eth transaction
  		const ethTx = {
		    transactionId: doc._id,
		    asset: {
			symbol: "ETH",
			decimals: 18,
			address: null,
			name: "Ethereum"
		    },
		    timeStamp: doc.timeStamp,
		    value: doc.value,
		    to: doc.to,
		    from: doc.from,
		    txHash: doc._id,
		    txStatus: doc.error ? "error": "success"
		};
		transactions.push(ethTx);				    
	       }		
	    });
	    dispatch({ type: TRANSACTIONS_ADD_MANY, payload: transactions });
	} catch (error) {
	    console.error(error);
	    return error;
	};
    };
}


// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
    address: '0x6c0f58ad4eb24da5769412bf34ddee698c4d185b', // #TODO don't use hardcoded address
    transactions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TRANSACTIONS_ADD_MANY:
    const newState = {
	...state
    };

      action.payload.map(tx => {
	  // add tx only if it is not present yet
	  if (newState.transactions
	      .filter(tx_ => tx_.transactionId === tx.transactionId)
	      .length === 0) {
	        newState.transactions.push(tx);
	  }
      });
      
      return newState;      
  default:
    return state;
  }
};
