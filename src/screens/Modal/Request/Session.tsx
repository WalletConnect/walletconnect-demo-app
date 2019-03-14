import * as React from "react";
import PropTypes from "prop-types";
import { SCard, SCardTitle, SParameter, SActions } from "./common";
import { getChainData } from "../../../helpers/utilities";

class SessionRequest extends React.Component<any, any> {
  static propTypes = {
    address: PropTypes.string,
    chainId: PropTypes.number,
    payload: PropTypes.object.isRequired,
    approveRequest: PropTypes.func.isRequired,
    rejectRequest: PropTypes.func.isRequired
  };

  static defaultProps = {
    newSession: false
  };

  render() {
    const {
      address,
      chainId,
      payload,
      approveRequest,
      rejectRequest
    } = this.props;
    const newSession =
      payload.method === "wc_sessionRequest" ||
      payload.method === "session_request";
    let params: { label: string; value: any }[] = [];
    const activeChain = getChainData(chainId);
    if (newSession) {
      const { name, description, url } = payload.params[0].peerMeta;
      params = [
        { label: "Name", value: name },
        { label: "Description", value: description },
        { label: "Url", value: url },
        { label: "Address", value: address },
        { label: "Chain", value: activeChain.name }
      ];
    } else {
      const sessionUpdate = payload.params[0];
      const requestedChain = getChainData(sessionUpdate.chainId);
      params = [
        {
          label: "Current",
          value: [
            { label: "Address", value: address },
            { label: "Chain", value: activeChain.name }
          ]
        },
        {
          label: "Requested",
          value: [
            { label: "Address", value: sessionUpdate.accounts[0] },
            { label: "Chain", value: requestedChain.name }
          ]
        }
      ];
    }
    return (
      <SCard>
        <SCardTitle>
          {newSession ? "Session Request" : "Session Update"}
        </SCardTitle>
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

export default SessionRequest;
