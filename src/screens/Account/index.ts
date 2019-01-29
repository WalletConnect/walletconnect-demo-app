import { createStackNavigator } from "react-navigation";

import AccountBalancesScreen from "./AccountBalancesScreen";
import AccountTransactionsScreen from "./AccountTransactionsScreen";

const AccountStack = createStackNavigator({
  AccountBalances: AccountBalancesScreen,
  AccountTransactions: AccountTransactionsScreen
});

export default AccountStack;
