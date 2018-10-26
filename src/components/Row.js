import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRow = styled.View`
  flex-direction: row;
`;

const Row = ({ children, ...props }) => <StyledRow {...props}>{children}</StyledRow>;

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;
