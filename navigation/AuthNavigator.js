import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreen from "../screens/SignUpScreen.js";
import SignInScreen from "../screens/SignInScreen.js";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen.js";
import ResetPasswordScreen from "../screens/ResetPasswordScreen.js";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
