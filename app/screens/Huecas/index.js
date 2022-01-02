import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { BaseStyle, useTheme } from "@config";
import { Header, SafeAreaView, TourItem } from "@components";
import { TourData } from "@data";

export default function Huecas({ navigation }) {
  const { colors } = useTheme();

  const [refreshing] = useState(false);
  const [tours] = useState(TourData);

  /**
   * render Item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = (item) => {
    return (
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
    );
  };

  /**
   * @description Loading booking item history one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Listado de huecas"} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={tours}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}
