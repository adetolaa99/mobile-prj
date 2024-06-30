import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [secretKeyVisible, setSecretKeyVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          setError("No auth token found");
          return;
        }

        const response = await axios.get(
          "http://172.20.10.5:8080/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert(
      "Copied to Clipboard",
      "The key has been copied to your clipboard."
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.warning}>
        WARNING: Keep your Secret key safe. Anyone with access to your secret
        key can steal your funds!
      </Text>

      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{profile.username}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{profile.email}</Text>

      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.value}>{profile.firstName}</Text>

      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.value}>{profile.lastName}</Text>

      <Text style={styles.label}>Public Key:</Text>
      <TouchableOpacity
        onPress={() => copyToClipboard(profile.stellarPublicKey)}
      >
        <Text style={[styles.value, styles.copyable]}>
          {profile.stellarPublicKey}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Secret Key:</Text>
      {secretKeyVisible ? (
        <TouchableOpacity
          onPress={() => copyToClipboard(profile.stellarSecretKey)}
        >
          <Text style={[styles.value, styles.copyable]}>
            {profile.stellarSecretKey}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.revealButton}
          onPress={() => setSecretKeyVisible(true)}
        >
          <Text style={styles.revealButtonText}>Reveal Secret Key</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  copyable: {
    color: "green",
  },
  error: {
    color: "red",
  },
  warning: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  revealButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  revealButtonText: {
    color: "green",
    fontWeight: "bold",
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: "#006400",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
