import * as React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import { setTopLevelNavigator } from "./navigation";
import { walletConnectInit } from "./redux/_walletConnect";
import { accountInit } from "./redux/_account";
import AccountStack from "./screens/Account";
import ScanStack from "./screens/Scan";
import SettingsStack from "./screens/Settings";
import ModalStack from "./screens/Modal";
import { initFCM } from "./helpers/firebase";

const MainTabNavigator = createBottomTabNavigator(
  {
    Account: AccountStack,
    Scan: ScanStack,
    Settings: SettingsStack
  },
  {
    initialRouteName: "Account",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        let iconSource = null;

        switch (routeName) {
          case "Account":
            iconSource = focused
              ? require("./assets/wallet-blue.png")
              : require("./assets/wallet-gray.png");
            break;
          case "Scan":
            iconSource = focused
              ? require("./assets/scan-blue.png")
              : require("./assets/scan-gray.png");
            break;
          case "Settings":
            iconSource = focused
              ? require("./assets/settings-blue.png")
              : require("./assets/settings-gray.png");
            break;
          default:
            break;
        }

        return (
          <Image
            source={iconSource}
            style={{ width: 25, height: 25, margin: 10 }}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#3b99fc",
      inactiveTintColor: "gray"
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Main: MainTabNavigator,
    Modal: ModalStack
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
    mode: "modal"
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component<any, any> {
  componentDidMount() {
    // this.props.walletConnectInit();
    // initFCM();
    this.props.accountInit();
  }
  render = () => (
    <AppContainer ref={navigatorRef => setTopLevelNavigator(navigatorRef)} />
  );
}

export default connect(
  null,
  { walletConnectInit, accountInit }
)(App);
