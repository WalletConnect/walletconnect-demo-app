import React, { Component } from 'react';
import Container from '../components/Container';
import Card from '../components/Card';
import Section from '../components/Section';
import Label from '../components/Label';
import Text from '../components/Text';
import Button from '../components/Button';

class SettingsScreen extends Component {
  render() {
    return (
      <Container>
        <Card>
          <Section>
            <Label>{'Network'}</Label>
            <Text>{'Mainnet'}</Text>
          </Section>
          <Section>
            <Label>{'Wallet'}</Label>
            <Text>{'Account 1'}</Text>
          </Section>
          <Section>
            <Label>{'Seed Words'}</Label>
            <Button>{'Backup'}</Button>
          </Section>
        </Card>
      </Container>
    );
  }
}

export default SettingsScreen;
