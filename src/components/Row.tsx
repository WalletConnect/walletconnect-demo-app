import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SRow = styled.View`
  width: auto;
  padding: ${(props: any) => `${props.padding}px`};
  justify-content: center;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #e9eaeb;
`;

const Row = (props: any) => (
  <SRow padding={props.padding} {...props}>
    {props.children}
  </SRow>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.number
};

Row.defaultProps = {
  padding: 15
};

export default Row;
