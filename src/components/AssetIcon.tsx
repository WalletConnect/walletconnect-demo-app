import * as React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import ImageLoad from "react-native-image-placeholder";

const size = 40;

const SCircle = styled.View`
  height: ${size}px;
  width: ${size}px;
  border-radius: ${size / 2}px;
  background-color: #fff;
`;

const styles = StyleSheet.create({
  circleIcon: {
    height: size,
    width: size,
    borderRadius: size / 2
  }
});

function getIconUrl(contractAddress: string) {
  if (!contractAddress) {
    return require("../assets/ethereum.png");
  }

  return {
    uri: `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${contractAddress}.png`
  };
}

const AssetIcon = (props: any) => (
  <SCircle>
    <ImageLoad
      source={getIconUrl(props.asset.contractAddress)}
      style={styles.circleIcon}
      isShowActivity={false}
      placeholderSource={require("../assets/default-token.png")}
      customImagePlaceholderDefaultStyle={styles.circleIcon}
      loadingStyle={styles.circleIcon}
      borderRadius={size / 2}
      placeholderStyle={styles.circleIcon}
    />
  </SCircle>
);

export default AssetIcon;
