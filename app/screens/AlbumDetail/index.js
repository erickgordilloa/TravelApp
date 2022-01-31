import React, { useState, useEffect } from "react";
import { View, ScrollView, Animated, FlatList } from "react-native";
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
import { useTranslation } from "react-i18next";

export default function AlbumDetail({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [tours] = useState(TourData);
  const deltaY = new Animated.Value(0);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 75;

  return (
    <View style={{ flex: 1 }}>
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
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />
      {/* Header */}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={"dark"} enableRTL={true} />
          );
        }}
        renderRight={() => {
          return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate("PreviewImage");
        }}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left", "bottom"]}>
        <FlatList
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: deltaY },
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 20 }}>
              <View
                style={[
                  styles.blockView,
                  {
                    marginTop: marginTopBanner + 70,
                  },
                ]}
              >
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

              <View style={[styles.blockView]}>
                <Text body2 style={{ marginTop: 5 }}>
                  218 Austen Mountain, consectetur adipiscing, sed eiusmod
                  tempor incididunt ut labore et dolore
                </Text>
              </View>

              <FlatList
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
                    style={{
                      marginBottom: 15,
                      marginLeft: 15,
                    }}
                    onPress={() => {
                      navigation.navigate("AlbumDetail");
                    }}
                    onPressBookNow={() => {
                      navigation.navigate("PreviewBooking");
                    }}
                  />
                )}
              />
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
