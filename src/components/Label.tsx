import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SLabel = styled.Text`
  font-weight: 600;
  margin-bottom: 6px;
`;

const Label = (props: any) => <SLabel {...props}>{props.children}</SLabel>;

Label.propTypes = {
  children: PropTypes.node.isRequired
};

export default Label;
