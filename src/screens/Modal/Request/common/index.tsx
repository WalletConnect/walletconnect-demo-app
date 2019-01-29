import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../../../components/Button";

export const SCard = styled.View`
  background-color: rgb(255, 255, 255);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 20px;
`;

export const SCardTitle = styled.Text`
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin: 10px auto;
`;

interface IContainerStyleProps {
  nesting: string;
}

const SContainerStyleTypes = styled.View<IContainerStyleProps>``;
export const SContainer = styled(SContainerStyleTypes)`
  width: 100%;
  min-height: 50px;
  padding: ${(props: any) =>
    props.nesting ? `0 0 0 ${props.nesting * 10}px` : "0"};
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

const SParameterLabel = styled.Text`
  font-weight: bold;
  margin-bottom: 6px;
`;

const SParameterValue = styled.Text`
  font-family: "Menlo-Regular";
`;

const SParameter = (props: any) => {
  const { param, nesting } = props;
  const { label, value } = param;
  return value ? (
    <SContainer>
      <SParameterLabel>{label || "Unknown"}</SParameterLabel>
      {typeof value !== "object" ? (
        <SParameterValue adjustsFontSizeToFit numberOfLines={1} {...props}>
          {value}
        </SParameterValue>
      ) : Array.isArray(value) ? (
        value.map(val => (
          <SParameter key={val.label} nesting={nesting + 1} param={val} />
        ))
      ) : (
        <SParameter nesting={nesting + 1} param={value} />
      )}
    </SContainer>
  ) : null;
};

SParameter.propTypes = {
  param: PropTypes.object.isRequired,
  nesting: PropTypes.number
};

SParameter.defaultProps = {
  nesting: 0
};

const SActions = (props: any) => {
  return (
    <SContainer>
      <SButtonContainer>
        <SButton color="rgb(0, 153, 77)" onPress={props.approveRequest}>
          {"Approve"}
        </SButton>
        <SButton color="rgb(214, 75, 71)" onPress={props.rejectRequest}>
          {"Reject"}
        </SButton>
      </SButtonContainer>
    </SContainer>
  );
};

SActions.propTypes = {
  approveRequest: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired
};

export { SParameter, SActions };
