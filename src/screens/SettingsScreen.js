import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../components/Container';
import Card from '../components/Card';
import Section from '../components/Section';
import Label from '../components/Label';
import Text from '../components/Text';
import Button from '../components/Button';
import { capitalize } from '../helpers/utilities';

class SettingsScreen extends Component {
  render() {
    const { network } = this.props;
    return (
      <Container>
        <Card>
          <Section>
            <Label>{'Network'}</Label>
            <Text>{capitalize(network)}</Text>
          </Section>
          <Section>
            <Label>{'Wallet'}</Label>
            <Text>{'Account 1'}</Text>
          </Section>
          <Section>
            <Label>{'Seed Words'}</Label>
            <Button onPress={() => {}}>{'Backup'}</Button>
          </Section>
        </Card>
      </Container>
    );
  }
}

SettingsScreen.propTypes = {
  network: PropTypes.any.isRequired,
};

const reduxProps = ({ account }) => ({
  network: account.network,
});

export default connect(
  reduxProps,
  null,
)(SettingsScreen);
