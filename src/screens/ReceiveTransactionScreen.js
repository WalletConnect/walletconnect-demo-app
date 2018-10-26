import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../components/Container';
import Text from '../components/Text';

const StyledText = styled(Text)`
  flex-wrap: wrap;
  text-align: center;
  height: 100px;
  font-size: 18px;
  padding-top: 32px;
  margin: 0;
`;

class ReceiveTransactionScreen extends Component {
  render() {
    console.log(this.props);
    return (
      <Container>
        <StyledText color="#777">{'Work in Progress'}</StyledText>
      </Container>
    );
  }
}

ReceiveTransactionScreen.propTypes = {
  navigation: PropTypes.any,
};

export default ReceiveTransactionScreen;
