import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ActivateAccountForm from "../components/ActivateAccountForm.js";

const ActivateAccountScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Enter your Public key below to activate your Wallet.
          </Text>
          <Text style={styles.subtitle}>
            You will be credited with{" "}
            <Text style={styles.highlight}>10,000 FUC tokens</Text> to carry out
            all financial activities within the app.
          </Text>
          <ActivateAccountForm />
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
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
  highlight: {
    color: "#006400",
    fontWeight: "bold",
  },
});

export default ActivateAccountScreen;
