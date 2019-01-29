import * as React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Section from "../../components/Section";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import { accountUpdateChainId } from "../../redux/_account";
import supportedChains from "../../helpers/chains";
import { IChainData } from "../../helpers/types";

class SettingsChainsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Chains",
    headerTitle: "Chains"
  };
  onUpdateChain = (idx: number) => {
    this.props.accountUpdateChainId(idx);
    this.props.navigation.navigate("SettingsList");
  };
  render = () => {
    return (
      <ScrollViewContainer>
        {!!supportedChains.length ? (
          supportedChains.map((chainData: IChainData) => (
            <TouchableOpacity
              key={chainData.chain_id}
              onPress={() => this.onUpdateChain(chainData.chain_id)}
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
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      margin: 10
                    }}
                    source={require("../../assets/network-black.png")}
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
                    {chainData.name}
                  </Text>
                </Section>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>{`Failed to retrieve supportedChains`}</Text>
        )}
      </ScrollViewContainer>
    );
  };
}

export default connect(
  null,
  { accountUpdateChainId }
)(SettingsChainsScreen);
