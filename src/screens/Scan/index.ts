import { createStackNavigator } from "react-navigation";

import ScanScreen from "./ScanScreen";

const ScanStack = createStackNavigator({
  Scan: ScanScreen
});

export default ScanStack;
