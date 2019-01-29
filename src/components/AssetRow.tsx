import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Row from "./Row";
import AssetIcon from "./AssetIcon";
import {
  convertAmountFromRawNumber,
  handleSignificantDecimals
} from "../helpers/bignumber";

const SAssetRow = styled(Row)`
  height: 70px;
`;

const SBalanceWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const SBalanceText = styled.Text`
  color: #242836;
  line-height: 20px;
`;

const SAssetName = styled.Text`
  color: #242836;
  letter-spacing: 1px;
  margin-left: 15px;
  line-height: 20px;
`;

const SAssetNameWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const AssetRow = (props: any) => (
  <SAssetRow>
    <SAssetNameWrapper>
      <AssetIcon asset={props.asset} />
      <SAssetName>{props.asset.name}</SAssetName>
    </SAssetNameWrapper>
    <SBalanceWrapper>
      <SBalanceText>{`${handleSignificantDecimals(
        convertAmountFromRawNumber(props.asset.balance, props.asset.decimals),
        8
      )} ${props.asset.symbol}`}</SBalanceText>
    </SBalanceWrapper>
  </SAssetRow>
);

AssetRow.propTypes = {
  asset: PropTypes.object.isRequired
};

export default AssetRow;
