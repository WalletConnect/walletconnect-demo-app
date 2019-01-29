import * as React from "react";
import PropTypes from "prop-types";
import { SCard, SCardTitle, SParameter, SActions } from "./common";
import {
  convertAmountFromRawNumber,
  convertHexToString
} from "../../../helpers/bignumber";

class TransactionRequest extends React.Component<any, any> {
  static propTypes = {
    address: PropTypes.string,
    chainId: PropTypes.number,
    payload: PropTypes.object.isRequired,
    approveRequest: PropTypes.func.isRequired,
    rejectRequest: PropTypes.func.isRequired
  };

  render() {
    const { payload, approveRequest, rejectRequest } = this.props;
    const tx = payload.params[0];
    const params = [
      { label: "From", value: tx.from },
      { label: "To", value: tx.to },
      {
        label: "Value",
        value: `${convertAmountFromRawNumber(convertHexToString(tx.value))} ETH`
      },
      { label: "Data", value: tx.data || "0x" }
    ];
    return (
      <SCard>
        <SCardTitle>{"Transaction Request"}</SCardTitle>
        {params.map(param => (
          <SParameter key={param.label} param={param} />
        ))}
        <SActions
          approveRequest={approveRequest}
          rejectRequest={rejectRequest}
        />
      </SCard>
    );
  }
}

export default TransactionRequest;
