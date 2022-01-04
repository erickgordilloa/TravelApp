import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { BaseStyle, useTheme, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, TourItem, TextInput } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { TourData } from "@data";
import { useTranslation } from "react-i18next";

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
  const [modeView, setModeView] = useState("grid");
  const [tours] = useState(TourData);

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
              placeholder={t("search")}
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
                  <Icon name="times" size={18} color={BaseColor.grayColor} />
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
      <Header
        title={"Home"}
        //subTitle="24 Dec 2018, 2 Nights, 1 Room"
        /* renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }} */
        /* renderRight={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate("SearchHistory");
        }} */
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        {renderContent()}
      </SafeAreaView>
    </View>
  );
}
