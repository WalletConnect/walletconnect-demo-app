import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.View`
  width: 100%;
  background-color: rgb(255, 255, 255);
  margin: 0px;
  padding: 15px;
  border-radius: 0px;
`;

const Card = ({ children, ...props }) => <StyledCard {...props}>{children}</StyledCard>;

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
