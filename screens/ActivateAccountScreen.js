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
            Enter your Public key below to activate your Wallet. You will be
            credited with 10,000 FUC tokens to carry out all financial
            activities within the app.
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
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
    paddingHorizontal: 20,
  },
});

export default ActivateAccountScreen;
