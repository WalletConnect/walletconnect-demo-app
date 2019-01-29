import * as React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, Text } from "react-native";
import Blockies from "react-native-blockies";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import Section from "../../components/Section";
import { accountUpdateAddress } from "../../redux/_account";

class SettingsAccountsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Accounts",
    headerTitle: "Accounts"
  };
  onUpdateAddress = (idx: number) => {
    this.props.accountUpdateAddress(idx);
    this.props.navigation.navigate("SettingsList");
  };
  render = () => {
    const { accounts } = this.props;
    return (
      <ScrollViewContainer>
        {!!accounts.length ? (
          accounts.map((address: string, idx: number) => (
            <TouchableOpacity
              key={address}
              onPress={() => this.onUpdateAddress(idx)}
            >
              <View
                style={{
                  height: 70,
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#e9eaeb"
                }}
              >
                <Section style={{ width: "auto", height: "auto", flex: 1 }}>
                  <Blockies
                    blockies={address}
                    size={30}
                    style={{
                      width: 30,
                      height: 30,
                      margin: 10
                    }}
                  />
                </Section>
                <Section style={{ width: "auto", height: "auto", flex: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Menlo-Regular",
                      paddingLeft: 20,
                      paddingRight: 10
                    }}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                  >
                    {address}
                  </Text>
                </Section>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>{`Failed to retrieve accounts`}</Text>
        )}
      </ScrollViewContainer>
    );
  };
}

const reduxProps = (reduxState: any) => ({
  accounts: reduxState.account.accounts
});

export default connect(
  reduxProps,
  { accountUpdateAddress }
)(SettingsAccountsScreen);
