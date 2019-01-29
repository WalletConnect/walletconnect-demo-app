import * as React from "react";
import {
  Alert,
  Image,
  Text,
  Clipboard,
  View,
  TouchableOpacity
} from "react-native";
import Blockies from "react-native-blockies";
import Card from "./Card";
import Section from "./Section";
import { getChainData } from "../helpers/utilities";

class AccountHeader extends React.Component<any, any> {
  copyToClipboard = () => {
    Clipboard.setString(this.props.address);
    Alert.alert("Copied", "Address copied to clipboard");
  };

  render = () => {
    const { address, chainId } = this.props;
    const chainName = getChainData(chainId).name;
    return (
      <Card
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#e9eaeb"
        }}
      >
        <View
          style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <Section style={{ width: "auto", height: "auto", flex: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: 10
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{`Connected to `}</Text>
              <Text>{chainName}</Text>
            </View>
          </Section>
          <Section style={{ width: "auto", height: "auto", flex: 2 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
              onPress={this.copyToClipboard}
            >
              <Text style={{ fontWeight: "bold" }}>{`Copy`}</Text>
              <Image
                source={require("../assets/clipboard-black.png")}
                style={{ width: 20, height: 20, margin: 5 }}
              />
            </TouchableOpacity>
          </Section>
        </View>
        <View
          style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 10,
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <Section style={{ width: "auto", height: "auto", flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <Section style={{ width: "auto", height: "auto", flex: 1 }}>
                <Blockies
                  blockies={address}
                  size={25}
                  style={{
                    width: 25,
                    height: 25,
                    margin: 10
                  }}
                />
              </Section>
              <Section style={{ width: "auto", height: "auto", flex: 10 }}>
                <Text
                  style={{ fontFamily: "Menlo-Regular", paddingLeft: 10 }}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {address || "Loading..."}
                </Text>
              </Section>
            </View>
          </Section>
        </View>
      </Card>
    );
  };
}

export default AccountHeader;
