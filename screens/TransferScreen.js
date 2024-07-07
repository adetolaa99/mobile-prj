import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TransferForm from "../components/TransferForm.js";

const TransferScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Transfer <Text style={styles.highlight}>FUC</Text> to another
            user by entering the Receiver's public key and the amount of tokens you wish
            to transfer.
          </Text>
          <TransferForm />
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
    paddingHorizontal: 20,
  },
  highlight: {
    color: "#006400",
    fontWeight: "bold",
  },
});

export default TransferScreen;
