import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SignUpForm from "../components/SignUpForm.js";

const SignUpScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={require("../assets/logo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcome}>
            Welcome to Fountain University Mobile Wallet
          </Text>
          <SignUpForm navigation={navigation} />
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already a user? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: "#333",
  },
  signInLink: {
    fontSize: 16,
    color: "#006400",
    textDecorationLine: "underline",
  },
});
export default SignUpScreen;
