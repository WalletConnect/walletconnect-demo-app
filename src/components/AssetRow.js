import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AssetIcon from './AssetIcon';

const StyledAssetRow = styled.View`
  flex-direction: row;
  height: 80px;
`;

const StyledBalance = styled.View`
  margin-top: 30px;
  margin-right: 11;
`;

const StyledBalanceText = styled.Text`
  color: #242836;
  line-height: 20px;
`;

const StyledSymbol = styled.Text`
  color: #242836;
  letter-spacing: 1px;
  line-height: 20px;
`;

const StyledSymbolWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const AssetRow = ({ asset }) => (
  <StyledAssetRow>
    <StyledSymbolWrapper>
      <AssetIcon asset={asset} />
      <StyledSymbol>{asset.name}</StyledSymbol>
    </StyledSymbolWrapper>
    <StyledBalance>
      <StyledBalanceText>{`${Number(asset.balance).toFixed(8)} ${asset.symbol}`}</StyledBalanceText>
    </StyledBalance>
  </StyledAssetRow>
);

AssetRow.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default AssetRow;
