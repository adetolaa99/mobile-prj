import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActivateAccountForm = () => {
  const [publicKey, setPublicKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    if (!publicKey) {
      Alert.alert("Error", "Please enter your public key");
      return;
    }
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error", "No auth token found");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://172.20.10.5:8080/api/stellar/receive-asset",
        { publicKey },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert(
        "Success",
        "10,000 FUC Tokens have been sent to your account!"
      );
    } catch (error) {
      console.error("Activation Error: ", error);
      Alert.alert(
        "Error",
        error.response ? error.response.data : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your Public Key"
        value={publicKey}
        onChangeText={setPublicKey}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleActivate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Activate</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "100%",
  },
  button: {
    backgroundColor: "#006400",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ActivateAccountForm;
