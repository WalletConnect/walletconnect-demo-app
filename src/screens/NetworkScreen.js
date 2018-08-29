import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../components/Container';
import Card from '../components/Card';
import Section from '../components/Section';
import Label from '../components/Label';
import Text from '../components/Text';
import Button from '../components/Button';


class NetworkScreen extends Component {
  render() {
    return (
      <Container>
        <Card>
          <Section>
            <Label>{'Network'}</Label>
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


export default NetworkScreen;
