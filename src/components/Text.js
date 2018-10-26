import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.Text`
  color: ${({ color }) => color};
  margin-bottom: 6px;
`;

const Text = ({ color, children, ...props }) => (
  <StyledText color={color} {...props}>
    {children}
  </StyledText>
);

Text.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  color: '#333333',
};

export default Text;
