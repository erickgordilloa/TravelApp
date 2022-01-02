import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "@actions";
import { BaseStyle, useTheme, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
} from "@components";
import styles from "./styles";
import { UserData } from "@data";
import { useTranslation } from "react-i18next";

export default function Profile({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [userData] = useState(UserData[0]);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const logOut = () => {
    setLoading(true);
    dispatch(AuthActions.onLogOut()); //AQUI CERRAR SESION
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Perfil"}
        /* renderRight={() => {
          return <Icon name="bell" size={24} color={colors.primary} />;
        }} */
        onPressRight={() => {
          navigation.navigate("Notification");
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={userData.image}
              textFirst={userInfo?.username}
              textSecond={userInfo?.email}
              onPress={() => console.log("ir a cambiar la foto")}
            />
            {/* <ProfilePerformance
              data={userData.performance}
              style={{ marginTop: 20, marginBottom: 20 }}
            /> */}
            <TouchableOpacity
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                  marginTop: 20,
                },
              ]}
              onPress={() => {
                navigation.navigate("ProfileEdit");
              }}
            >
              <Text body1>{"Editar Perfil"}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <Text body1>{"Cambiar Contraseña"}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <Text body1>{"Mis Reseñas"}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button
            full
            outline
            round
            loading={loading}
            onPress={() => logOut()}
            style={{ backgroundColor: BaseColor.whiteColor }}
          >
            {"Log out"}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
