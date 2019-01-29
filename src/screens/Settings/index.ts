import { createStackNavigator } from "react-navigation";

import SettingsListScreen from "./SettingsListScreen";
import SettingsAccountsScreen from "./SettingsAccountsScreen";
import SettingsChainsScreen from "./SettingsChainsScreen";

const SettingsStack = createStackNavigator(
  {
    SettingsList: SettingsListScreen,
    SettingsAccounts: SettingsAccountsScreen,
    SettingsChains: SettingsChainsScreen
  },
  {
    initialRouteName: "SettingsList"
  }
);

export default SettingsStack;
