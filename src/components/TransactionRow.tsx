import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { View } from "react-native";
import Text from "./Text";
import { ellipseAddress } from "../helpers/utilities";
import {
  convertAmountFromRawNumber,
  handleSignificantDecimals,
  convertStringToNumber
} from "../helpers/bignumber";

const STransactionRow = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  height: 100px;
  justify-content: space-between;
  padding-top: 15px;
  padding-left: 25px;
  padding-right: 15px;
`;

const SArrow = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 25px;
  margin-top: 5px;
`;
const SErrorLabel = styled.Text`
  color: red;
  font-size: 10;
`;
const SAddress = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const SRow = styled.View`
  flex-direction: row;
`;

const SFlexEnd = styled.View`
  align-self: flex-end;
`;
const SValue = styled.Text`
  font-size: 18px;
`;

const TransactionRow = (props: any) => {
  const { tx, address } = props;
  const txValue = handleSignificantDecimals(
    convertAmountFromRawNumber(tx.value, tx.asset.decimals),
    8
  );
  const incomingTx = tx.to.toLowerCase() === address.toLowerCase();
  const date = new Date(convertStringToNumber(tx.timeStamp)).toLocaleString();
  const otherAddress = incomingTx ? tx.from : tx.to;
  return (
    <STransactionRow>
      <SRow>
        <SArrow
          source={
            incomingTx
              ? require("../assets/arrow-in.png")
              : require("../assets/arrow-out.png")
          }
        />

        <View>
          <SRow>
            {tx.error === "error" ? <SErrorLabel>Fail</SErrorLabel> : null}

            <SAddress>{ellipseAddress(otherAddress)}</SAddress>
          </SRow>
          <Text color={"grey"}> {date} </Text>
        </View>
      </SRow>
      <View>
        <SFlexEnd>
          <SValue>{`${txValue} ${tx.asset.symbol}`}</SValue>
        </SFlexEnd>
      </View>
    </STransactionRow>
  );
};

TransactionRow.propTypes = {
  tx: PropTypes.object.isRequired,
  navigator: PropTypes.any.isRequired,
  address: PropTypes.string.isRequired
};

export default TransactionRow;
