import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import Container from '../components/Container';
import Card from '../components/Card';
import networks from '../ref/networks.json';

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
