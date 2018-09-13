import { convertAmountFromRawNumber } from './bignumber';

export const parseAccountBalances = data => {
  const assets = data.map(asset => {
    const balance = convertAmountFromRawNumber(asset.balance, asset.decimals);
    return {
      address: asset.contract.address,
      name: asset.contract.name,
      symbol: asset.contract.symbol,
      decimals: asset.contract.decimals,
      balance,
    };
  });
  return assets.sort((a, b) => Number(a.address) - Number(b.address)); // sort by address so that ether is always first;
};

export const getEtherAssetObject = () => ({
  symbol: 'ETH',
  decimals: 18,
  address: null,
  name: 'Ethereum',
});

export const parseAccountTransactions = (data, network) => {
  const transactions = [];

  if (!!data && data.docs) {
    data.docs.forEach(doc => {
      const events = [];
      if (doc.operations) {
        // parse events in the tx
        doc.operations.forEach(op => {
          let event = {};
          // token transfers
          if (op.type === 'token_transfer') {
            event = {
              transactionId: op.transactionId,
              asset: {
                symbol: op.contract.symbol,
                decimals: op.contract.decimals,
                address: op.contract.address,
                name: op.contract.name,
              },
              value: op.value,
              to: op.to,
              from: op.from,
              type: op.type,
            };
          } else {
            // unknown operation type
            event = {
              ...op,
            };
          }
          events.push(event);
        });

        // eth transaction
        const ethTx = {
          transactionId: doc._id,
          asset: getEtherAssetObject,
          timeStamp: doc.timeStamp,
          value: doc.value,
          to: doc.to,
          from: doc.from,
          txHash: doc._id,
          txStatus: doc.error ? 'error' : 'success',
          network,
          events,
        };
        transactions.push(ethTx);
      }
    });
  }

  return transactions;
};
