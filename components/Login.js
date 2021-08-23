import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterForm from "./Register";
import { requestLogin } from "../api";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const LoginForm = (props) => {
  const navigation = useNavigation();
  const { storeData, setAuthToken, setRegistering, registering } = props;
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loaded] = useFonts({
    GilroyLight: require("../assets/fonts/Gilroy-Light.otf"),
    GilroyBold: require("../assets/fonts/Gilroy-ExtraBold.otf"),
  });
  if (!loaded) {
    return null;
  }

  if (registering) {
    return <RegisterForm setRegistering={setRegistering} />;
  }
  function handleLogin(event) {
    console.log("logged in");
    event.preventDefault();
    requestLogin(email, password);
    requestLogin(email, password).then((res) => {
      storeData(res.data.auth_token);
      setAuthToken(res.data.auth_token);
    });
  }

  return (
    <ImageBackground
      source="./assets/Untitled-4.jpg"
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.formLabel}>S A V R </Text>
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          name="email"
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="black"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          name="password"
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
          style={styles.inputStyle}
        />
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={(event) => handleLogin(event)}
            color="white"
          />
        </View>
        <View style={styles.register}>
          <Text style={styles.register}>Don't have an account?</Text>
          <Button
            title="Sign Up"
            onPress={() => setRegistering(true)}
            color="#00D64B"
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "white",
  },
  formLabel: {
    fontSize: 40,
    color: "black",
    fontFamily: "GilroyLight",
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#DCDCDC",
    fontFamily: "GilroyLight",
  },

  button: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#00D64B",
    color: "white",
    fontFamily: "GilroyLight",
  },

  register: {
    paddingVertical: 25,
    fontFamily: "GilroyLight",
  },

  logo: {
    backgroundColor: "blue",
    justifyContent: "center",
  },

  forgot: {
    position: "absolute",
    bottom: 30,
  },
});

export default LoginForm;
