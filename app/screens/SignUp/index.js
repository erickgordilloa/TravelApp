import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BaseStyle, useTheme } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Button,
  TextInput,
  Text,
} from "@components";
import { AuthActions } from "@actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function SignUp({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [visible, setVisible] = useState(true);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    password: true,
    passwordConfirm: true,
  });

  const register = useSelector((state) => state.register);
  const { login } = register;

  const ui = useSelector((state) => state.ui);
  const { error, loading } = ui;

  useEffect(() => {
    if (error.length === 0) return;

    Alert.alert("Login incorrecto", error, [
      {
        text: "Ok",
        onPress: () => dispatch(AuthActions.onRemoveError()),
      },
    ]);
  }, [error]);

  useEffect(() => {
    console.log("info", login);
    if (login) {
      return navigation.goBack();
    }
  }, [login]);

  const onSignUp = () => {
    if (name == "" || email == "" || password == "") {
      setSuccess({
        ...success,
        name: name != "" ? true : false,
        email: email != "" ? true : false,
        password: password != "" ? true : false,
        passwordConfirm: passwordConfirm != "" ? true : false,
      });
    } else {
      dispatch(AuthActions.register(name, email, password));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Creat your account"}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}
        >
          <View style={styles.contain}>
            <TextInput
              onChangeText={(text) => setName(text)}
              placeholder={"Name"}
              success={success.name}
              value={name}
              textLabel={
                <Text
                  body1
                  style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }}
                >
                  Name
                </Text>
              }
            />
            <TextInput
              onChangeText={(text) => setEmail(text)}
              placeholder={"Email"}
              keyboardType="email-address"
              success={success.email}
              value={email}
              textLabel={
                <Text
                  body1
                  style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }}
                >
                  Email
                </Text>
              }
            />
            <TextInput
              //style={{ marginTop: 10 }}
              secureTextEntry={visible}
              onChangeText={(text) => setPassword(text)}
              placeholder={"Password"}
              success={success.password}
              value={password}
              textLabel={
                <Text
                  body1
                  style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }}
                >
                  Password
                </Text>
              }
              icon={
                <TouchableOpacity onPress={() => setVisible(!visible)}>
                  <Icon
                    name={visible ? "eye-slash" : "eye"}
                    size={20}
                    color={colors.primary}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              }
            />
            <TextInput
              secureTextEntry={visiblePassword}
              onChangeText={(text) => setPasswordConfirm(text)}
              placeholder={"Password confirm"}
              success={success.passwordConfirm}
              value={passwordConfirm}
              textLabel={
                <Text
                  body1
                  style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }}
                >
                  Password Confirm
                </Text>
              }
              icon={
                <TouchableOpacity
                  onPress={() => setVisiblePassword(!visiblePassword)}
                >
                  <Icon
                    name={visiblePassword ? "eye-slash" : "eye"}
                    size={20}
                    color={colors.primary}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              }
            />
            <Button
              full
              round
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSignUp()}
            >
              Create account
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
