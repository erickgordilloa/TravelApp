import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { BaseStyle, useTheme } from "@config";
import { Header, SafeAreaView, Icon, Button, TextInput } from "@components";
import styles from "./styles";
import { useTranslation } from "react-i18next";

export default function SignUp({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    password: true,
    passwordConfirm: true,
    cellphone: true,
    gender: true,
  });

  /**
   * call when action signup
   *
   */
  const onSignUp = () => {
    if (name == "" || email == "" || password == "") {
      setSuccess({
        ...success,
        name: name != "" ? true : false,
        cellphone: cellphone != "" ? true : false,
        gender: gender != "" ? true : false,
        email: email != "" ? true : false,
        password: password != "" ? true : false,
        passwordConfirm: passwordConfirm != "" ? true : false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("SignIn");
      }, 500);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Crear cuenta"}
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
              placeholder={"Nombre completo"}
              success={success.name}
              value={name}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={(text) => setCellphone(text)}
              placeholder={"Número celular"}
              success={success.cellphone}
              value={cellphone}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={(text) => setEmail(text)}
              placeholder={"Email"}
              keyboardType="email-address"
              success={success.email}
              value={email}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={(text) => setPassword(text)}
              placeholder={"Contraseña"}
              success={success.password}
              value={password}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={(text) => setPassword(text)}
              placeholder={"Confirmar contraseña"}
              success={success.passwordConfirm}
              value={passwordConfirm}
            />
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSignUp()}
            >
              Registrarse
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
