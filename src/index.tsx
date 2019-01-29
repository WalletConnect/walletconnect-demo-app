import * as React from "react";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
