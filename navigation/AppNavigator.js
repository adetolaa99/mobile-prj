import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen.js";
import ActivateAccountScreen from "../screens/ActivateAccountScreen.js";
import BalanceScreen from "../screens/BalanceScreen.js";
import TransferScreen from "../screens/TransferScreen.js";
import TransactionScreen from "../screens/TransactionScreen.js";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Activate Account") {
            iconName = focused ? "key" : "key-outline";
          } else if (route.name === "Wallet Balance") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Transfer") {
            iconName = focused ? "send" : "send-outline";
          } else if (route.name === "Transaction History") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Activate Account" component={ActivateAccountScreen} />
      <Tab.Screen name="Wallet Balance" component={BalanceScreen} />
      <Tab.Screen name="Transfer" component={TransferScreen} />
      <Tab.Screen name="Transaction History" component={TransactionScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
