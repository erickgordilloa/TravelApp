import React, { useState } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  Image,
  Text,
  Icon,
  HotelItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
  FilterSort,
  TourItem,
  EventItem,
} from "@components";
import { BaseStyle, Images, useTheme, BaseColor } from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import { PromotionData, TourData, HotelData, EventListData } from "@data";
import { useTranslation } from "react-i18next";

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [icons] = useState([
    {
      icon: "calendar-alt",
      name: "Restaurantes",
      route: "Hotel",
    },
    {
      icon: "map-marker-alt",
      name: "Sánduches",
      route: "Tour",
    },
    {
      icon: "car-alt",
      name: "Cafeterías",
      route: "OverViewCar",
    },
    {
      icon: "plane",
      name: "Mariscos",
      route: "FlightSearch",
    },
    {
      icon: "ship",
      name: "Heladerías",
      route: "CruiseSearch",
    },
    {
      icon: "bus",
      name: "Pastelerías",
      route: "BusSearch",
    },
    {
      icon: "star",
      name: "Favoritas",
      route: "DashboardEvent",
    },
    {
      icon: "ellipsis-h",
      name: "Cerca",
      route: "More",
    },
  ]);
  const [relate] = useState([
    {
      id: "0",
      image: Images.event4,
      title: "BBC Music Introducing",
      time: "Thu, Oct 31, 9:00am",
      location: "Tobacco Dock, London",
    },
    {
      id: "1",
      image: Images.event5,
      title: "Bearded Theory Spring Gathering",
      time: "Thu, Oct 31, 9:00am",
      location: "Tobacco Dock, London",
    },
  ]);
  const [promotion] = useState(PromotionData);
  const [refreshing] = useState(false);
  const [tours] = useState(TourData);
  const [hotels] = useState(HotelData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [recommend] = useState(EventListData);
  const deltaY = new Animated.Value(0);
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    40
  );

  const onChangeSort = () => {};

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderIconService = () => {
    return (
      <FlatList
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}
            >
              <View
                style={[
                  styles.iconContent,
                  { backgroundColor: colors.background },
                ]}
              >
                <Icon name={item.icon} size={18} color={colors.primary} solid />
              </View>
              <Text footnote grayColor numberOfLines={1}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;

  const renderListHuecas = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: "clamp",
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          data={tours}
          key={"list"}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <View>
              <TourItem
                list
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
                  marginBottom: 20,
                }}
                onPress={() => {
                  navigation.navigate("HuecasDetail");
                }}
                onPressBookNow={() => {
                  navigation.navigate("PreviewBooking");
                }}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={Images.homeImage}
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
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
                  styles.searchForm,
                  {
                    marginTop: marginTopBanner,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    shadowColor: colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => console.log("aqui ir a buscar")}
                  activeOpacity={0.9}
                >
                  <View
                    style={[
                      BaseStyle.textInput,
                      { backgroundColor: colors.background },
                    ]}
                  >
                    <Text body1 grayColor>
                      ¿Qué hueca te interesa visitar hoy?
                    </Text>
                  </View>
                </TouchableOpacity>
                {renderIconService()}
              </View>
            </View>
          }
          ListFooterComponent={
            <View>
              {/* huecas destacadas */}

              <View style={styles.contentService}>
                <View style={styles.titleView}>
                  <Text title3 semibold>
                    Huecas destacadas
                  </Text>
                  <Text body2 grayColor>
                    Seguro hay más de una cerca de ti
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingHorizontal: 12,
                  }}
                >
                  <Text body2 grayColor>
                    Ver todas{" "}
                    <Icon
                      name="angle-right"
                      size={16}
                      color={BaseColor.dividerColor}
                    />
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                  paddingBottom: 20,
                }}
                horizontal={true}
                data={recommend}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <EventItem
                    grid
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    location={item.location}
                    tracking={item.tracking}
                    rate={item.rate}
                    status={item.status}
                    price={item.price}
                    priceSale={item.priceSale}
                    eventType={"aqui el tipo"}
                    time={item.time}
                    user={item.user}
                    numTicket={item.numTicket}
                    liked={item.liked}
                    style={{ marginLeft: 15, width: 200 }}
                    onPress={() => navigation.navigate("HuecasDetail")}
                    onPressTag={() => navigation.navigate("Review")}
                  />
                )}
              />
              {/* huecas destacadas */}

              {/* Lista de Huecas */}
              {renderListHuecas()}
              {/* Lista de Huecas */}
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
