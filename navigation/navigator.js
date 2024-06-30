import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen.js";
import SignInScreen from "../screens/SignInScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import ActivateAccountScreen from "../screens/ActivateAccountScreen.js";
import BalanceScreen from "../screens/BalanceScreen.js";
import TransferScreen from "../screens/TransferScreen.js";
import TransactionScreen from "../screens/TransactionScreen.js";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Activate Account"
          component={ActivateAccountScreen}
        />
        <Stack.Screen name="Wallet Balance" component={BalanceScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen
          name="Transaction History"
          component={TransactionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
