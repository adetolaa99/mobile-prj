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
import TransferForm from "../components/TransferForm.js";

const TransferScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
   const transferFormRef = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (transferFormRef.current) {
      transferFormRef.current.refreshForm();
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
            Transfer <Text style={styles.highlight}>FUC</Text> to another user
            by entering the Receiver's public key and the amount of tokens you
            wish to transfer.
          </Text>
          <TransferForm ref={transferFormRef} />
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
