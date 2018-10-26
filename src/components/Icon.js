import React from 'react';
import PropTypes from 'prop-types';
import RNVectorIcon from 'react-native-vector-icons/FontAwesome';

const Icon = ({
  name, size, color, ...props
}) => <RNVectorIcon name={name} size={size} color={color} {...props} />;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Icon;
