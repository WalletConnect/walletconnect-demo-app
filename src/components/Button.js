import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = styled.TouchableHighlight`
  position: relative;
  background-color: #00b371;
  width: 100%;
  height: 33%;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-align: center;
`;

const Button = props => (
  <ButtonContainer underlayColor={'#00A367'} onPress={props.onPress} outline={props.outline}>
    <Label outline={props.outline}>{props.children}</Label>
  </ButtonContainer>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  outline: PropTypes.bool,
};

Button.defaultProps = {
  outline: false,
};

export default Button;
