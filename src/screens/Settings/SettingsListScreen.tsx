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
