import * as React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import QRCodeScanner from "react-native-qrcode-scanner";
import Container from "../../components/Container";
import { walletConnectOnSessionRequest } from "../../redux/_walletConnect";

const SText = styled(Text)`
  flex-wrap: wrap;
  text-align: center;
  height: 100px;
  font-size: 18px;
  padding-top: 32px;
  color: #777;
  margin: 0;
`;

class ScanScreen extends React.Component<any, any> {
  scanner: any;

  static navigationOptions = {
    title: "Scan",
    headerTitle: "Scan"
  };

  onRead = async (event: any) => {
    const uri = event.data;

    if (uri && typeof uri === "string") {
      console.log("uri", uri);
      this.props.walletConnectOnSessionRequest(uri);
    }

    setTimeout(() => {
      this.scanner.reactivate();
    }, 1000);
  };

  render = () => (
    <Container>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <SText>{"Scan a WalletConnect QR code"}</SText>
      </View>
      <QRCodeScanner
        topViewStyle={{ flex: 0, height: 0 }}
        bottomViewStyle={{ flex: 0, height: 0 }}
        style={{ flex: 1 }}
        ref={(c: any) => {
          this.scanner = c;
        }}
        onRead={this.onRead}
      />
    </Container>
  );
}

export default connect(
  null,
  { walletConnectOnSessionRequest }
)(ScanScreen);
