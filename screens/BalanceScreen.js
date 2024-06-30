import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BalanceForm from "../components/BalanceForm.js";

const BalanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        The balance of your FUC tokens and Stellar XLM is displayed below.
      </Text>
      <Text style={styles.title}>
        FUC tokens are used to transact and Stellar XLM is used to handle the
        gas fee on each transaction.
      </Text>
      <BalanceForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
    paddingHorizontal: 30,
  },
});

export default BalanceScreen;
