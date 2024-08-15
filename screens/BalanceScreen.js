import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import BalanceForm from "../components/BalanceForm.js";

const BalanceScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const balanceFormRef = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (balanceFormRef.current) {
      balanceFormRef.current.refreshBalances();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            The balance of your <Text style={styles.highlight}>FUC</Text> tokens
            and Stellar <Text style={styles.highlight}>XLM</Text> is displayed
            below.
          </Text>
          <Text style={styles.subtitle}>
            <Text style={styles.highlight}>FUC </Text>is used to transact while{" "}
            <Text style={styles.highlight}>XLM</Text> is used to handle the gas
            fee on each transaction.
          </Text>
          <BalanceForm ref={balanceFormRef} />
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
