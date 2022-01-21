import React, { useState } from "react";
import { RefreshControl, View, Animated, TouchableOpacity } from "react-native";
import { BaseStyle, useTheme, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  TourItem,
  TextInput,
  Text,
} from "@components";
import styles from "./styles";
import { TourData } from "@data";
import { useTranslation } from "react-i18next";
import { FloatingAction } from "react-native-floating-action";

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const [search, setSearch] = useState("");
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
  const { colors } = useTheme();

  const [refreshing] = useState(false);
  const [tours] = useState(TourData);

  const actions = [
    {
      text: "Add visited place",
      icon: <Icon name="map-marker-alt" size={18} color={"white"} />,
      name: "add_visited_place",
      position: 1,
    },
    {
      text: "Create bucket list",
      icon: <Icon name="clipboard-list" size={18} color={"white"} />,
      name: "create_bucket_list",
      position: 2,
    },
    {
      text: "Create trip album",
      icon: <Icon name="book" size={18} color={"white"} />,
      name: "bt_room",
      position: 3,
    },
  ];

  const renderContent = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: "clamp",
    });
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          contentContainerStyle={{
            paddingTop: 70,
          }}
          columnWrapperStyle={{
            paddingLeft: 5,
            paddingRight: 20,
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
                navigation.navigate("TourDetail");
              }}
              onPressBookNow={() => {
                navigation.navigate("PreviewBooking");
              }}
            />
          )}
        />
        <Animated.View
          style={[
            styles.navbar,
            {
              transform: [{ translateY: navbarTranslate }],
            },
          ]}
        >
          <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
            <TextInput
              onChangeText={(text) => setSearch(text)}
              placeholder={t("Search country, city, restaurants, bar...")}
              value={search}
              onSubmitEditing={() => {
                onSearch(search);
              }}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setSearch("");
                  }}
                  style={styles.btnClearSearch}
                >
                  <Icon name="search" size={18} color={BaseColor.grayColor} />
                </TouchableOpacity>
              }
            />
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Home"} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        {renderContent()}
      </SafeAreaView>

      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
        }}
      />
    </View>
  );
}
