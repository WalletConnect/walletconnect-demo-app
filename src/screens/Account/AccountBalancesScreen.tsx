import * as React from "react";
import {
  Alert,
  Image,
  Text,
  Clipboard,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { accountGetAssets } from "../../redux/_account";
import { IAssetData } from "../../helpers/types";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import Card from "../../components/Card";
import Section from "../../components/Section";
import AssetRow from "../../components/AssetRow";
import AccountHeader from "../../components/AccountHeader";

class AccountBalancesScreen extends React.Component<any, any> {
  static navigationOptions = (props: any) => {
    return {
      title: "Account",
      headerTitle: "Account"
      // TODO: FIX TRANSACTIONS SCREEN FIRST
      // headerRight: (
      //   <TouchableOpacity
      //     onPress={() => props.navigation.navigate("AccountTransactions")}
      //   >
      //     <Image
      //       source={require("../../assets/transactions-black.png")}
      //       style={{ width: 20, height: 20, margin: 5, marginRight: 20 }}
      //     />
      //   </TouchableOpacity>
      // )
    };
  };

  state = {
    firstLoad: true
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.firstLoad) {
      if (prevProps.loading && !this.props.loading) {
        this.setState({ firstLoad: false });
      }
    }
  }

  getBalances = () => {
    if (!this.props.loading) {
      this.props.accountGetAssets();
    }
  };
  copyToClipboard = () => {
    Clipboard.setString(this.props.address);
    Alert.alert("Copied", "Address copied to clipboard");
  };
  render() {
    const { initiating, loading, address, assets, chainId } = this.props;
    const firstLoad = (initiating || loading) && this.state.firstLoad;
    return (
      <ScrollViewContainer refreshing={loading} onRefresh={this.getBalances}>
        <AccountHeader address={address} chainId={chainId} />
        <Card>
          <Section>
            {!firstLoad ? (
              !!assets.length ? (
                assets.map((asset: IAssetData, index: number) => (
                  <AssetRow key={index} asset={asset} />
                ))
              ) : (
                <View
                  style={{
                    height: 200,
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text>{"No Balances Found"}</Text>
                </View>
              )
            ) : (
              <View
                style={{
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator size="large" color="gray" />
              </View>
            )}
          </Section>
        </Card>
      </ScrollViewContainer>
    );
  }
}

const reduxProps = (reduxState: any) => ({
  initiating: reduxState.account.initiating,
  loading: reduxState.account.loading,
  address: reduxState.account.address,
  assets: reduxState.account.assets,
  chainId: reduxState.account.chainId
});

export default connect(
  reduxProps,
  { accountGetAssets }
)(AccountBalancesScreen);
