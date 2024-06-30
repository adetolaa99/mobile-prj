import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BalanceForm from "../components/BalanceForm.js";

const BalanceScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            The balance of your <Text style={styles.highlight}>FUC tokens</Text>{" "}
            and Stellar <Text style={styles.highlight}>XLM</Text> is displayed
            below.
          </Text>
          <Text style={styles.subtitle}>
            <Text style={styles.highlight}>FUC </Text>is used to transact and{" "}
            <Text style={styles.highlight}>XLM</Text> is used to handle the gas
            fee on each transaction.
          </Text>
          <BalanceForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 34,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
  highlight: {
    color: "#006400",
    fontWeight: "bold",
  },
});

export default BalanceScreen;
