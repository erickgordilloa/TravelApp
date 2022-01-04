import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "@actions";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BaseStyle, useTheme } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
} from "@components";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function SignIn({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  //const [id, setId] = useState("");
  const [email, setEmail] = useState("stefano@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ email: true, password: true });

  const { login, error, userInfo } = useSelector((state) => state.auth);
  console.log(login, error, userInfo);

  /**
   * call when action login
   *
   */
  const onLogin = () => {
    if (email == "" || password == "") {
      setSuccess({
        ...success,
        email: false,
        password: false,
      });
    } else {
      setLoading(true);
      dispatch(
        AuthActions.login(email, password, (response) => {
          //me quede aqui
          setLoading(false);
          navigation.goBack();
        })
        /* AuthActions.authentication(false, (response) => {
          //me quede aqui
          setLoading(false);
          navigation.goBack();
        }) */
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Sign In to VEBO"}
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
              onChangeText={(text) => setEmail(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  email: true,
                });
              }}
              placeholder={"Email"}
              success={success.email}
              value={email}
              textLabel={
                <Text body1 style={{ textAlign: "left", marginBottom: 10 }}>
                  Email
                </Text>
              }
            />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={"Password"}
              secureTextEntry={visible}
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
            <View style={styles.contentActionBottom}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResetPassword")}
              >
                <Text body1 primaryColor>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              style={{ marginTop: 20 }}
              full
              round
              loading={loading}
              onPress={() => {
                onLogin();
              }}
            >
              Sign in
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text
                body1
                grayColor
                style={{ marginTop: 25, textAlign: "center" }}
              >
                Don't have an account?{" "}
                <Text body1 primaryColor style={{ marginTop: 25 }}>
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
