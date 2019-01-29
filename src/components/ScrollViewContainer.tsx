import * as React from "react";
import { ScrollView, RefreshControl } from "react-native";
import Container from "./Container";

class ScrollViewContainer extends React.Component<any, any> {
  state = {
    firstLoad: true
  };
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.firstLoad) {
      if (prevProps.refreshing && !this.props.refreshing) {
        this.setState({ firstLoad: false });
      }
    }
  }
  render() {
    const { firstLoad } = this.state;
    const { refreshing, onRefresh, children } = this.props;
    let refreshControl;
    if (typeof refreshing !== "undefined" && onRefresh) {
      refreshControl = (
        <RefreshControl
          refreshing={!firstLoad && refreshing}
          onRefresh={onRefresh}
        />
      );
    }
    return (
      <ScrollView refreshControl={refreshControl}>
        <Container>{children}</Container>
      </ScrollView>
    );
  }
}

export default ScrollViewContainer;
