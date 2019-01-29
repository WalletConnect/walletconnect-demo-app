import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SText = styled.Text`
  color: ${(props: any) => props.color};
  margin-bottom: 6px;
`;

const Text = (props: any) => (
  <SText color={props.color} {...props}>
    {props.children}
  </SText>
);

Text.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired
};

Text.defaultProps = {
  color: "#333333"
};

export default Text;
