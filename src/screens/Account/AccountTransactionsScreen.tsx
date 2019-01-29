import * as React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { accountGetTransactions } from "../../redux/_account";
import Section from "../../components/Section";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import TransactionRow from "../../components/TransactionRow";

class AccountTransactionsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Transactions",
    headerTitle: "Transactions"
  };

  state = {
    firstLoad: true
  };

  componentDidMount() {
    this.getTransactions();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.firstLoad) {
      if (prevProps.loading && !this.props.loading) {
        this.setState({ firstLoad: false });
      }
    }
  }

  getTransactions = () => {
    if (!this.props.loading) {
      this.props.accountGetTransactions();
    }
  };

  render() {
    const { loading, address, transactions } = this.props;
    const firstLoad = loading && this.state.firstLoad;
    return (
      <ScrollViewContainer
        refreshing={loading}
        onRefresh={this.getTransactions}
      >
        <Section>
          {!firstLoad ? (
            !!transactions.length ? (
              <View style={{ flex: 5 }}>
                <FlatList
                  data={transactions}
                  ListEmptyComponent={
                    <View style={{ height: 100, marginTop: 50 }}>
                      <View>No Transactions yet</View>
                    </View>
                  }
                  onRefresh={() => this.getTransactions()}
                  refreshing={loading}
                  keyExtractor={(item: any) => item.hash}
                  renderItem={({ item }) => (
                    <TransactionRow
                      tx={item}
                      address={address}
                      navigator={navigator}
                    />
                  )}
                />
              </View>
            ) : (
              <View
                style={{
                  height: 200,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>{"No Transactions Found"}</Text>
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
      </ScrollViewContainer>
    );
  }
}

const reduxProps = (reduxState: any) => ({
  loading: reduxState.account.loading,
  address: reduxState.account.address,
  transactions: reduxState.account.transactions
});

export default connect(
  reduxProps,
  { accountGetTransactions }
)(AccountTransactionsScreen);
