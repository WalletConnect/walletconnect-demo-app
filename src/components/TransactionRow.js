import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, TouchableOpacity } from 'react-native';
import Text from './Text';
import { shortenAddress } from '../helpers/utilities';
// import { Icon } from 'react-native-elements';

const StyledTransactionRow = styled.View`
  flex: 1;
  flex-direction: row;
  height: 100px;
  justify-content: space-between;
  padding-top: 15px;
  padding-left: 25px;
  padding-right: 15px;
`;

const StyledArrow = styled.Image`
  margin-right: 25px;
  margin-top: 5px;
`;
const StyledErrorLabel = styled.Text`
  color: red;
  font-size: 10;
`;
const StyledAddress = styled.Text`
  font-size: 16;
  font-weight: bold;
`;

const StyledRow = styled.View`
  flex-direction: row;
`;

const StyledFlexEnd = styled.View`
  align-self: flex-end;
`;
const StyledValue = styled.Text`
  font-size: 20px;
`;

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
            txHash: tx.txHash,
          },
          navigatorStyle: {
            tabBarHidden: true,
          },
          title: 'Transaction Details', // navigation bar title of the pushed screen (optional)
          backButtonTitle: '', // override the back button title (optional)
        });
      }}
    >
      <StyledTransactionRow>
        <StyledRow>
          <StyledArrow
            source={
              isTxIncoming
                ? require('../assets//arrow-in.png') // eslint-disable-line
                : require('../assets//arrow-out.png') // eslint-disable-line
            }
          />

          <View>
            <StyledRow>
              {tx.txStatus === 'error' ? <StyledErrorLabel>Fail</StyledErrorLabel> : null}

              <StyledAddress>{shortenAddress(otherAddress, 4)}</StyledAddress>
            </StyledRow>
            {tx.txStatus === 'pending' ? <Text>Pending...</Text> : <Text color={'grey'}> {date} </Text>}
          </View>
        </StyledRow>
        <View>
          <StyledFlexEnd>
            <StyledValue>{txValue}</StyledValue>
          </StyledFlexEnd>
        </View>
      </StyledTransactionRow>
    </TouchableOpacity>
  );
};

TransactionRow.propTypes = {
  tx: PropTypes.object.isRequired,
  navigator: PropTypes.any.isRequired,
  address: PropTypes.string.isRequired,
};

export default TransactionRow;
