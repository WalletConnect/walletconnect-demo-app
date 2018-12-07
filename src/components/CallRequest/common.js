import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

export const SCard = styled.View`
  background-color: rgb(255, 255, 255);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 20px;
`;

export const SContainer = styled.View`
  width: 100%;
  min-height: 50px;
  padding: ${({ nesting }) => (nesting ? `0 0 0 ${nesting * 10}px` : '0')};
`;

export const SParameterSeparator = styled.View`
  width: 100%;
  position: absolute;
  left: 18px;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(230, 230, 230, 0.22);
`;

export const SButtonContainer = styled.View`
  margin-bottom: 40px;
  width: 100%;
  flex-direction: row;
`;

export const SButton = styled(Button)`
  margin: 10px;
  flex: 1;
`;

export const SParameterLabel = styled.Text`
  font-weight: bold;
  margin-bottom: 6px;
`;

export const SParameterValue = styled.Text`
  font-family: 'Menlo-Regular';
`;

const SParameter = ({ param, nesting, ...props }) => {
  const { label, value } = param;
  return (
    <SContainer nesting={nesting} {...props}>
      <SParameterLabel>{label || 'Unknown'}</SParameterLabel>
      {/*  eslint-disable-next-line */}
      {typeof value !== 'object' ? (
        <SParameterValue adjustsFontSizeToFit numberOfLines={1} {...props}>
          {value}
        </SParameterValue>
      ) : Array.isArray(value) ? (
        value.map(val => <SParameter key={val.label} nesting={nesting + 1} param={val} />)
      ) : (
        <SParameter nesting={nesting + 1} param={value} />
      )}
    </SContainer>
  );
};

SParameter.propTypes = {
  param: PropTypes.object.isRequired,
  nesting: PropTypes.number,
};

SParameter.defaultProps = {
  nesting: 0,
};

export { SParameter };
