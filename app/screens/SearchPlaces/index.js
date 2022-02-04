import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor, Images, useTheme } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import * as Utils from "@utils";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchPlaces({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Search"}
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
        onPressRight={() => {}}
      />
      <SafeAreaView
        style={{ height: "100%" }}
        edges={["right", "left", "bottom"]}
      >
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <GooglePlacesAutocomplete
            query={{
              key: "AIzaSyAvSs0sKmPbbIUZvQ0H0H4_ANWw1A1dBFM",
              language: "en", // language of the results
            }}
            placeholder="Search"
            onPress={(data, details = null) => {
              console.log(details);
              console.log(data);
              console.log("data.description", data.description.split(","));
            }}
            onFail={(error) => console.log(error)}
            styles={{
              textInputContainer: {
                backgroundColor: "rgba(0,0,0,0)",
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
