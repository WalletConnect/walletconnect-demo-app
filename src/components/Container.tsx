import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SContainer = styled.View`
  flex: 1;
`;

const Container = (props: any) => (
  <SContainer {...props}>{props.children}</SContainer>
);

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
