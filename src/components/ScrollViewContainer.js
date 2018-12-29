import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, RefreshControl } from 'react-native';
import Container from './Container';

const ScrollViewContainer = ({
  children, refreshing, onRefresh, ...props
}) => {
  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
  return (
    <ScrollView refreshControl={refreshControl} {...props}>
      <Container>{children}</Container>
    </ScrollView>
  );
};

ScrollViewContainer.propTypes = {
  children: PropTypes.node.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default ScrollViewContainer;
