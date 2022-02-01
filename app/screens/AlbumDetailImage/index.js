import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Animated,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { BaseStyle, BaseColor, Images, useTheme } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  PostListItem,
  HelpBlock,
  Button,
  RoomType,
  TourItem,
  ProfileGroup,
  TextInput,
  Image,
} from "@components";
import * as Utils from "@utils";
import { InteractionManager } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./styles";
import { TourData } from "@data";
import { FloatingAction } from "react-native-floating-action";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";

export default function AlbumDetailImage({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [tours] = useState(TourData);
  const [refreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const deltaY = new Animated.Value(0);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 75;

  const actions = [
    {
      text: "Select images",
      icon: <Icon name="camera" size={18} color={"white"} />,
      name: "camera",
      position: 1,
    },
    {
      text: "Edit trip",
      icon: <Icon name="pencil-alt" size={18} color={"white"} />,
      name: "edit",
      position: 2,
    },
    {
      text: "Delete this trip",
      icon: <Icon name="trash" size={18} color={"white"} />,
      name: "trash",
      color: "red",
      position: 2,
    },
  ];

  const openCameraEditCover = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log(images);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Galery media"}
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
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        <View>
          <Image source={Images.avata1} style={styles.cover} />
          <TouchableOpacity
            onPress={openCameraEditCover}
            style={[
              styles.blockLocationContent,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text footnote whiteColor>
              <Icon
                name="camera"
                size={16}
                color={colors.whiteColor}
                enableRTL={true}
              />{" "}
              Change photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
          <View style={styles.blockContentAddress}>
            <Icon name="map-marker-alt" color={colors.primary} size={16} />
            <Text
              body2
              primaryColor
              style={{
                marginLeft: 3,
              }}
              numberOfLines={1}
            >
              Tag Location
            </Text>
          </View>
          <TextInput
            onChangeText={(text) => setDescription(text)}
            placeholder={"Description"}
            value={description}
            style={{ marginVertical: 15 }}
          />
          <View style={{ paddingVertical: 15 }}>
            <Button
              loading={loading}
              full
              round
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  navigation.goBack();
                }, 500);
              }}
            >
              Edit Trip
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
