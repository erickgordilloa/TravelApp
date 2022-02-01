import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Animated,
  FlatList,
  RefreshControl,
} from "react-native";
import { BaseColor, Images, useTheme } from "@config";
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
  Trips,
  Tag,
} from "@components";
import * as Utils from "@utils";
import { InteractionManager } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./styles";
import { TourData } from "@data";
import { FloatingAction } from "react-native-floating-action";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";

export default function AlbumDetail({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [tours] = useState(TourData);
  const [refreshing] = useState(false);
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

  const openCameraSelectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log(images);
    });
  };

  const openCameraEditCover = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log(images);
    });
  };

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        ListHeaderComponent={
          <>
            <View>
              <Animated.Image
                source={Images.trip1}
                style={[
                  styles.imgBanner,
                  {
                    height: deltaY.interpolate({
                      inputRange: [
                        0,
                        Utils.scaleWithPixel(200),
                        Utils.scaleWithPixel(200),
                      ],
                      outputRange: [
                        heightImageBanner,
                        heightHeader,
                        heightHeader,
                      ],
                    }),
                  },
                ]}
              />
              <Icon
                name="arrow-left"
                size={20}
                color={"dark"}
                enableRTL={true}
                style={{ top: 0 }}
              />
            </View>

            <SafeAreaView
              edges={["right", "left"]}
              style={{ flex: 1, position: "relative" }}
            >
              <View style={{ padding: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text title1 bold style={{ marginBottom: 3 }}>
                      SayChelees
                    </Text>
                    <Tag outline round style={{ height: 30 }}>
                      14 Feb - 28 Feb
                    </Tag>
                  </View>
                </View>
              </View>

              <View style={{ padding: 15 }}>
                <Text body2 style={{ marginTop: 5 }}>
                  218 Austen Mountain, consectetur adipiscing, sed eiusmod
                  tempor incididunt ut labore et dolore
                </Text>
              </View>

              <FlatList
                style={{ marginRight: 15 }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={tours}
                key={"gird"}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <TourItem
                    grid
                    image={item.image}
                    name={item.name}
                    location={item.location}
                    travelTime={item.travelTime}
                    startTime={item.startTime}
                    price={item.price}
                    rate={item.rate}
                    rateCount={item.rateCount}
                    numReviews={item.numReviews}
                    author={item.author}
                    services={item.services}
                    style={{ marginBottom: 15, marginLeft: 15 }}
                    onPress={() => {
                      navigation.navigate("AlbumDetail");
                    }}
                    onPressBookNow={() => {
                      navigation.navigate("PreviewBooking");
                    }}
                  />
                )}
              />
            </SafeAreaView>
          </>
        }
      />

      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          if (name === "camera") {
            openCameraSelectImages();
          }
        }}
      />
    </View>
  );
}
