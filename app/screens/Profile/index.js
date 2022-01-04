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
  ProfilePerformance,
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
        title={"Profile"}
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
              textFirst={"Erick Gordillo"}
              textSecond={"egordillo@gmail.com"}
              onPress={() => navigation.navigate("ProfileEdit")}
            />
            <ProfilePerformance
              data={userData.performance}
              style={{
                marginTop: 20,
                marginBottom: 20,
                padding: 10,
                backgroundColor: "#ebe9e9",
                borderRadius: 10,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={[
                  styles.circlePoint,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Icon name={"heart"} size={20} color={"white"} />
              </View>
              <View>
                <Text body1 primaryColor style={{ marginBottom: 3 }}>
                  Favourite cities
                </Text>
                <Text body2>Cape town</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={[
                  styles.circlePoint,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Icon name={"map-marker-alt"} size={20} color={"white"} />
              </View>
              <View>
                <Text body1 primaryColor style={{ marginBottom: 3 }}>
                  Lived in
                </Text>
                <Text body2>Spain</Text>
              </View>
            </View>

            {/*  <TouchableOpacity
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
           */}
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
