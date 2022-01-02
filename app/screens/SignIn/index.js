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
  const [email, setEmail] = useState("cbastidas@links.com.ec");
  const [password, setPassword] = useState("1234567890");
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
        title={"Iniciar Sesión"}
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
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={(text) => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={"Contraseña"}
              secureTextEntry={true}
              success={success.password}
              value={password}
            />
            <Button
              style={{ marginTop: 20 }}
              full
              loading={loading}
              onPress={() => {
                onLogin();
              }}
            >
              Iniciar sesión
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text body1 bold primaryColor style={{ marginTop: 25 }}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
