import React, { useState, } from "react";
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
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const FundWalletForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [showWebView, setShowWebView] = useState(false);
  const [authorizationUrl, setAuthorizationUrl] = useState("");

  const handleFundWallet = async () => {
    if (!amount) {
      Alert.alert("Error!", "Please enter an amount");
      return;
    }
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error!", "No auth token found");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://172.20.10.5:8080/api/paystack/create-payment-intent",
        {
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment Intent Response: ", response.data);
      setPaymentIntent(response.data);
      setAuthorizationUrl(response.data.data.authorization_url);
      setShowWebView(true);
    } catch (error) {
      console.error("Funding Error: ", error);
      Alert.alert(
        "Error",
        error.response ? error.response.data : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (reference) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error!", "No auth token found");
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      console.log("Verifying payment with reference: ", reference);

      const response = await axios.post(
        "http://172.20.10.5:8080/api/paystack/verify-payment",
        {
          reference: reference,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Verification Response: ", response.data);

      if (response.data.success) {
        console.log("Verification successful. Minting tokens...");
        const mintResponse = await axios.post(
          "http://172.20.10.5:8080/api/paystack/mint-tokens",
          {
            userId: userId,
            amount: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Mint Tokens Response: ", mintResponse.data);
        Alert.alert("Success", "You've successfully funded your wallet!");
      } else {
        Alert.alert("Error", "Payment verification failed!");
      }
    } catch (error) {
      console.error("Payment verification error: ", error);
      Alert.alert("Error", "Payment verification failed");
    }
  };

  const handleWebViewNavigationStateChange = (navState) => {
    console.log("WebView Navigation State Change: ", navState.url);
    if (
      navState.url.includes("https://172.20.10.5:8080/api/paystack/callback")
    ) {
      setShowWebView(false);
      const urlParams = new URLSearchParams(navState.url.split("?")[1]);
      const reference = urlParams.get("reference");
      handlePaymentSuccess(reference);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleFundWallet}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Fund Wallet</Text>
        )}
      </TouchableOpacity>
      {showWebView && (
        <WebView
          source={{ uri: authorizationUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          onError={(error) => console.error("WebView Error: ", error)}
          onLoad={() => console.log("WebView loaded")}
          onLoadStart={() => console.log("WebView load started")}
          onLoadEnd={() => console.log("WebView load ended")}
          style={{ marginTop: 20, height: 600, width: "100%" }}
        />
      )}
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

export default FundWalletForm;
