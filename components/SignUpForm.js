import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUpForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
   const unsubscribe = navigation.addListener("focus", () => {
     setLoading(false);
     setErrorMessage("");
   });
   return unsubscribe;
  }, [navigation]);
  
    const SignUpSchema = Yup.object().shape({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters!")
        .required("Required"),
    });
  
  const handleSignUp = (values) => {
    setLoading(true);
    setErrorMessage("");
    axios
      .post("http://172.20.10.5:8080/api/users/signup", values)
      .then((response) => {
        console.log(response.data);
        navigation.navigate("Sign In");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setErrorMessage(
          error.response?.data?.message ||
            "You've already signed up! Please check your details and try again"
        );
      });
  };

   return (
     <Formik
       initialValues={{
         username: "",
         email: "",
         firstName: "",
         lastName: "",
         password: "",
       }}
       validationSchema={SignUpSchema}
       onSubmit={(values) => handleSignUp(values)}
     >
       {({
         handleChange,
         handleBlur,
         handleSubmit,
         values,
         errors,
         touched,
       }) => (
         <View style={styles.formContainer}>
           <TextInput
             placeholder="Username"
             onChangeText={handleChange("username")}
             onBlur={handleBlur("username")}
             value={values.username}
             style={styles.input}
           />
           {errors.username && touched.username ? (
             <Text style={styles.error}>{errors.username}</Text>
           ) : null}

           <TextInput
             placeholder="Email"
             onChangeText={handleChange("email")}
             onBlur={handleBlur("email")}
             value={values.email}
             style={styles.input}
             keyboardType="email-address"
           />
           {errors.email && touched.email ? (
             <Text style={styles.error}>{errors.email}</Text>
           ) : null}

           <TextInput
             placeholder="First Name"
             onChangeText={handleChange("firstName")}
             onBlur={handleBlur("firstName")}
             value={values.firstName}
             style={styles.input}
           />
           {errors.firstName && touched.firstName ? (
             <Text style={styles.error}>{errors.firstName}</Text>
           ) : null}

           <TextInput
             placeholder="Last Name"
             onChangeText={handleChange("lastName")}
             onBlur={handleBlur("lastName")}
             value={values.lastName}
             style={styles.input}
           />
           {errors.lastName && touched.lastName ? (
             <Text style={styles.error}>{errors.lastName}</Text>
           ) : null}

           <TextInput
             placeholder="Password"
             onChangeText={handleChange("password")}
             onBlur={handleBlur("password")}
             value={values.password}
             style={styles.input}
             secureTextEntry
           />
           {errors.password && touched.password ? (
             <Text style={styles.error}>{errors.password}</Text>
           ) : null}

           {errorMessage ? (
             <Text style={styles.errorMessage}>{errorMessage}</Text>
           ) : null}

           {loading ? (
             <ActivityIndicator
               size="large"
               color="#006400"
               style={styles.loader}
             />
           ) : (
             <TouchableOpacity onPress={handleSubmit} style={styles.button}>
               <Text style={styles.buttonText}>Create account</Text>
             </TouchableOpacity>
           )}
         </View>
       )}
     </Formik>
   );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#006400",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SignUpForm;
