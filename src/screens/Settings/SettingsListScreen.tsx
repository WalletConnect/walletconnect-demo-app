import * as React from "react";
import { connect } from "react-redux";
import { View, Image } from "react-native";
import SettingsList from "react-native-settings-list";
import { ellipseAddress, getChainData } from "../../helpers/utilities";

class SettingsListScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Settings",
    headerTitle: "Settings"
  };
  testModal = () => {
    const screenProps = {
      peerId: "e1081b57-0d0f-417a-b8f2-8f4d1db59071",
      peerMeta: {
        description: "",
        url: "http://localhost:3000",
        icons: ["http://localhost:3000/favicon.ico"],
        name: "WalletConnect Example",
        ssl: false
      },
      payload: {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_sign",
        params: [
          "0x9b7b2B4f7a391b6F14A81221AE0920A9735B67Fb",
          "bla bla bla test message - 1548170365491"
        ]
      }
    };
    this.props.navigation.navigate("Request", screenProps);
  };

  render = () => (
    <View style={{ flex: 1 }}>
      <SettingsList borderColor="lightgray" defaultItemSize={50}>
        <SettingsList.Item
          icon={
            <Image
              style={{
                width: 25,
                height: 25,
                margin: 15,
                marginLeft: 25,
                marginRight: 10
              }}
              source={require("../../assets/wallet-black.png")}
            />
          }
          title="Account"
          titleInfo={ellipseAddress(this.props.address)}
          titleInfoStyle={{ color: "#777" }}
          onPress={() => this.props.navigation.navigate("SettingsAccounts")}
        />
        <SettingsList.Item
          icon={
            <Image
              style={{
                width: 25,
                height: 25,
                margin: 15,
                marginLeft: 25,
                marginRight: 10
              }}
              source={require("../../assets/network-black.png")}
            />
          }
          title="Chain"
          titleInfo={getChainData(this.props.chainId).name}
          titleInfoStyle={{ color: "#777" }}
          onPress={() => this.props.navigation.navigate("SettingsChains")}
        />
        <SettingsList.Item
          icon={
            <Image
              style={{
                width: 25,
                height: 25,
                margin: 15,
                marginLeft: 25,
                marginRight: 10
              }}
              source={require("../../assets/network-black.png")}
            />
          }
          title="Test Modal Example"
          titleInfo="eth_sign"
          titleInfoStyle={{ color: "#777" }}
          onPress={this.testModal}
        />
      </SettingsList>
    </View>
  );
}

const reduxProps = (reduxState: any) => ({
  chainId: reduxState.account.chainId,
  address: reduxState.account.address
});

export default connect(
  reduxProps,
  null
)(SettingsListScreen);
