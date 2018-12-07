import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import Container from '../components/Container';
import Card from '../components/Card';
import networks from '../ref/networks.json';

import { addTestCallRequest } from '../redux/_callRequests';
import { showCallRequestModal } from '../navigation';

/* ------------------ TESTING ----------------------------------------------- */

async function onTestCallRequest(callData) {
  const sessionId = 'fake';
  const callId = '0x0';
  const dappName = 'Test Dapp';
  await addTestCallRequest(sessionId, callId, callData);
  await showCallRequestModal({ sessionId, callId, dappName });
}

const address = '0x7daf8edf399a40b7a96025ce1b3b886a65219e32';

const testTransaction = {
  id: 1,
  jsonrpc: '2.0',
  method: 'eth_sendTransaction',
  params: [
    {
      from: address,
      nonce: '0x0',
      gasPrice: '0x4a817c800',
      gas: '0x5208',
      to: '0x3535353535353535353535353535353535353535',
      value: '0xde0b6b3a7640000',
      input: '0x',
    },
  ],
};

const testMessage = {
  id: 2,
  jsonrpc: '2.0',
  method: 'eth_sign',
  params: [address, '0xdeadbeaf'],
};

const testTypedData = {
  id: 3,
  jsonrpc: '2.0',
  method: 'eth_signTypedData',
  params: [
    address,
    {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Person: [{ name: 'name', type: 'string' }, { name: 'account', type: 'address' }],
        Mail: [{ name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }],
      },
      primaryType: 'Mail',
      domain: {
        name: 'Example Dapp',
        version: '0.7.0',
        chainId: 1,
        verifyingContract: '0x0000000000000000000000000000000000000000',
      },
      message: {
        from: {
          name: 'Alice',
          account: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        },
        to: {
          name: 'Bob',
          account: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        },
        contents: 'Hey, Bob!',
      },
    },
  ],
};

const testModals = [
  {
    title: 'Testing-1',
    subtitle: 'Test Transaction Modal',
    screen: 'WalletConnect.CallRequestScreen',
    onPress: () => onTestCallRequest(testTransaction),
  },
  {
    title: 'Testing-2',
    subtitle: 'Test Message Modal',
    screen: 'WalletConnect.CallRequestScreen',
    onPress: () => onTestCallRequest(testMessage),
  },
  {
    title: 'Testing-3',
    subtitle: 'Test TypedData Modal',
    screen: 'WalletConnect.CallRequestScreen',
    onPress: () => onTestCallRequest(testTypedData),
  },
];

/* ------------------ TESTING ----------------------------------------------- */

class SettingsScreen extends Component {
  render() {
    const { network } = this.props;
    const rows = [
      {
        title: 'Network',
        subtitle: networks[network].name,
        screen: 'WalletConnect.NetworkScreen',
      },
      {
        title: 'Account',
        subtitle: 'Account 1',
        screen: 'WalletConnect.AccountScreen',
      },
    ];

    return (
      <Container>
        <Card>
          <List containerStyle={{ marginTop: 0 }}>
            {rows.map(r => (
              <ListItem
                key={r.title}
                title={r.title}
                subtitle={r.subtitle}
                onPress={() => {
                  this.props.navigator.push({
                    screen: r.screen,
                    title: r.title,
                    navigatorStyle: {
                      tabBarHidden: true,
                    },
                    backButtonTitle: '',
                  });
                }}
              />
            ))}
            {testModals.map(r => (
              <ListItem key={r.title} title={r.title} subtitle={r.subtitle} onPress={r.onPress} />
            ))}
          </List>
        </Card>
      </Container>
    );
  }
}

SettingsScreen.propTypes = {
  network: PropTypes.any.isRequired,
  navigator: PropTypes.any.isRequired,
};

const reduxProps = ({ account }) => ({
  network: account.network,
});

export default connect(
  reduxProps,
  null,
)(SettingsScreen);
