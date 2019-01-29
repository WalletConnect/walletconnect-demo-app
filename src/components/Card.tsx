import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SCard = styled.View`
  width: 100%;
  background-color: rgb(255, 255, 255);
  margin: 0px;
  /* padding: 15px; */
  border-radius: 0px;
`;

const Card = (props: any) => <SCard {...props}>{props.children}</SCard>;

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;
