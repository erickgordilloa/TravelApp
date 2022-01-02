import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
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
} from "@components";
import * as Utils from "@utils";
import { InteractionManager } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./styles";
import { HelpBlockData } from "@data";
import { useTranslation } from "react-i18next";

export default function HuecasDetail({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
    longitudeDelta: 0.004,
  });
  const [roomType] = useState([
    {
      id: "1",
      image: Images.room8,
      name: "Standard Twin Room",
      price: "$399,99",
      available: "Hurry Up! This is your last room!",
      services: [
        { icon: "wifi", name: "Free Wifi" },
        { icon: "shower", name: "Shower" },
        { icon: "users", name: "Max 3 aduts" },
        { icon: "subway", name: "Nearby Subway" },
      ],
    },
    {
      id: "2",
      image: Images.room5,
      name: "Delux Room",
      price: "$399,99",
      available: "Hurry Up! This is your last room!",
      services: [
        { icon: "wifi", name: "Free Wifi" },
        { icon: "shower", name: "Shower" },
        { icon: "users", name: "Max 3 aduts" },
        { icon: "subway", name: "Nearby Subway" },
      ],
    },
  ]);
  const [todo] = useState([
    {
      id: "1",
      title: "South Travon",
      image: Images.trip1,
    },
    {
      id: "2",
      title: "South Travon",
      image: Images.trip2,
    },
    {
      id: "3",
      title: "South Travon",
      image: Images.trip3,
    },
    {
      id: "4",
      title: "South Travon",
      image: Images.trip4,
    },
    {
      id: "5",
      title: "South Travon",
      image: Images.trip5,
    },
  ]);
  const [helpBlock] = useState(HelpBlockData);
  const deltaY = new Animated.Value(0);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 75;

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={Images.room6}
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
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.whiteColor}
              enableRTL={true}
            />
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
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: deltaY },
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}
        >
          {/* Main Container */}
          <View style={{ paddingHorizontal: 20 }}>
            {/* Information */}
            <View
              style={[
                styles.contentBoxTop,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text title2 semibold style={{ marginBottom: 5 }}>
                Hilton San Francisco
              </Text>
              <Text title4 style={{ marginBottom: 5 }}>
                <Icon
                  name={"map-marker-alt"}
                  size={15}
                  color={colors.primary}
                />{" "}
                Hilton San Francisco
              </Text>
              <StarRating
                disabled={true}
                starSize={14}
                maxStars={5}
                rating={4.5}
                selectedStar={(rating) => {}}
                fullStarColor={BaseColor.yellowColor}
              />
              <Text
                caption2
                style={{
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                Facilities provided may range from a modest quality mattress in
                a small room to large suites
              </Text>
            </View>
            {/* Rating Review */}
            <View
              style={[styles.blockView, { borderBottomColor: colors.border }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={[
                    styles.circlePoint,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text title3 whiteColor>
                    9.5
                  </Text>
                </View>
                <View>
                  <Text title3 primaryColor style={{ marginBottom: 3 }}>
                    {t("excellent")}
                  </Text>
                  <Text body2>See 801 reviews</Text>
                </View>
              </View>
            </View>
            {/* Description */}
            <View
              style={[styles.blockView, { borderBottomColor: colors.border }]}
            >
              <Text headline semibold>
                {t("hotel_description")}
              </Text>
              <Text body2 style={{ marginTop: 5 }}>
                218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor
                incididunt ut labore et dolore
              </Text>
            </View>

            {/* Map location */}
            <View
              style={[styles.blockView, { borderBottomColor: colors.border }]}
            >
              <Text headline style={{ marginBottom: 5 }} semibold>
                Ubicación
              </Text>
              <Text body2 numberOfLines={2}>
                218 Austen Mountain, consectetur adipiscing, sed do eiusmod
                tempor incididunt ut labore et …
              </Text>
              <View
                style={{
                  height: 180,
                  width: "100%",
                  marginTop: 10,
                }}
              >
                {renderMapView && (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                    onRegionChange={() => {}}
                  >
                    <Marker
                      coordinate={{
                        latitude: 1.9344,
                        longitude: 103.358727,
                      }}
                    />
                  </MapView>
                )}
              </View>
            </View>
            {/* Open Time */}
            <View
              style={[styles.blockView, { borderBottomColor: colors.border }]}
            >
              <Text headline semibold>
                Horarios de atención
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text body2 grayColor>
                    Lunes a Viernes
                  </Text>
                  <Text body2 accentColor semibold>
                    8:00 - 15:00
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text body2 grayColor>
                    Sabados y feriados
                  </Text>
                  <Text body2 accentColor semibold>
                    7:00 - 23:00
                  </Text>
                </View>
              </View>
            </View>
            {/* Rooms */}
            <View
              style={[styles.blockView, { borderBottomColor: colors.border }]}
            >
              <Text headline semibold>
                Menú
              </Text>
              {roomType.map((item) => {
                <RoomType
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  available={""}
                  style={{ marginTop: 10 }}
                  onPress={() => {
                    console.log("menu");
                  }}
                />;
              })}
            </View>
            {/* Help Block Information */}
            <View>
              <HelpBlock
                title={"Datos de contacto"}
                description={"Puedes llamarnos"}
                phone={"0991691498"}
                email={helpBlock.email}
                style={{ margin: 20 }}
                onPress={() => {
                  navigation.navigate("ContactUs");
                }}
              />
            </View>
            {/* Other Information */}
          </View>
        </ScrollView>
        {/* Pricing & Booking Process */}
        <View
          style={[
            styles.contentButtonBottom,
            { borderTopColor: colors.border },
          ]}
        >
          <View>
            <Text caption1 semibold>
              {/*  {t("price")} */}
            </Text>
            <Text title3 primaryColor semibold>
              {/* $399.99 */}
            </Text>
            <Text caption1 semibold style={{ marginTop: 5 }}>
              {/* {t("avg_night")} */}
            </Text>
          </View>
          <Button onPress={() => navigation.navigate("Review")}>Reseñas</Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
