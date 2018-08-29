import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import Container from '../components/Container';
import Card from '../components/Card';
import { capitalize } from '../helpers/utilities';
import { accountUpdateNetwork } from '../redux/_account';


class NetworkScreen extends Component {
  render() {
    const { currentNetwork } = this.props;

    const networks = [
      'mainnet',
      'ropsten',
      'rinkeby',
      'koval',
    ];
    return (
      <Container>
        <Card>
          <List containerStyle={{ marginTop: 0 }}>
            {
              networks.map((n) => (
                <ListItem
                  key={n}
                  title={capitalize(n)}
                  hideChevron
                  leftIcon={(n === currentNetwork) ? { name: 'check' } : null }
                  onPress={() => {
                    this.props.accountUpdateNetwork(n);
                  }}
                />
              ))
            }
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

