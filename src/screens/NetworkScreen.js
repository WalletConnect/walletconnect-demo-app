import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import Container from '../components/Container';
import Card from '../components/Card';
import { accountUpdateNetwork } from '../redux/_account';
// import networks from '../ref/networks.json';

const networks = {
  mainnet: {
    id: 1,
    name: 'Mainnet',
  },
  // "ropsten": {
  //   "id": 3,
  //   "name": "Ropsten"
  // },
  // "rinkeby": {
  //   "id": 4,
  //   "name": "Rinkeby"
  // },
  // "kovan": {
  //   "id": 42,
  //   "name": "Kovan"
  // }
};

class NetworkScreen extends Component {
  render() {
    const { currentNetwork } = this.props;

    return (
      <Container>
        <Card>
          <List containerStyle={{ marginTop: 0 }}>
            {Object.keys(networks).map(network => (
              <ListItem
                key={network}
                title={networks[network].name}
                hideChevron
                leftIcon={network === currentNetwork ? { name: 'check' } : null}
                onPress={() => {
                  this.props.accountUpdateNetwork(network);
                }}
              />
            ))}
          </List>
        </Card>
      </Container>
    );
  }
}

NetworkScreen.propTypes = {
  currentNetwork: PropTypes.any.isRequired,
  accountUpdateNetwork: PropTypes.any.isRequired,
};

const reduxProps = ({ account }) => ({
  currentNetwork: account.network,
});

export default connect(
  reduxProps,
  { accountUpdateNetwork },
)(NetworkScreen);
