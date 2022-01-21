import React, { useState } from "react";
import { View, FlatList, RefreshControl, Animated } from "react-native";
import { BaseStyle, BaseColor, Images, useTheme } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  ProfilePerformance,
  Text,
  TourItem,
  ProfileDetail,
  Trips,
} from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import styles from "./styles";
import { UserData, TourData } from "@data";
import { FloatingAction } from "react-native-floating-action";

export default function Profile({ navigation }) {
  const { colors } = useTheme();
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

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Trips", title: "Trips" },
    { key: "Reviews", title: "Reviews" },
    { key: "Tagged", title: "Tagged" },
  ]);
  const [userData] = useState(UserData[0]);

  // When tab is activated, set what's index value
  const handleIndexChange = (index) => setIndex(index);

  // Customize UI tab bar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, { backgroundColor: colors.primary }]}
      style={[
        styles.tabbar,
        {
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.background,
        },
      ]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.primary}
      renderLabel={({ route, focused, color }) => (
        <View style={{ flex: 1, width: 130, alignItems: "center" }}>
          <Text headline semibold={focused} style={{ color }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "Trips":
        //return <InformationTab jumpTo={jumpTo} navigation={navigation} />;
        return <Trips jumpTo={jumpTo} navigation={navigation} />;
      case "Reviews":
        return <TourTab jumpTo={jumpTo} navigation={navigation} />;
      case "Tagged":
        return <PackageTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Profile"} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <ProfileDetail
            image={userData.image}
            textFirst={"Erick Gordillo"}
            textSecond={"egordillo@gmail.com"}
            onPress={() => navigation.navigate("ProfileEdit")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flex: 1, paddingLeft: 10, paddingVertical: 5 }}>
            <ProfilePerformance data={userData.performance} type="small" />
          </View>
        </View>

        {/* aqui lo nuevo */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={[styles.circlePoint, { backgroundColor: colors.primary }]}
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
            paddingHorizontal: 20,
          }}
        >
          <View
            style={[styles.circlePoint, { backgroundColor: colors.primary }]}
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

        {/* aqui lo nuevo */}

        <View style={{ flex: 1 }}>
          <TabView
            lazy
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
          />
        </View>

        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
        />
      </SafeAreaView>
    </View>
  );
}

/**
 * @description Show when tab Information activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function InformationTab({ navigation }) {
  const [tours] = useState(TourData);
  const { colors } = useTheme();
  const [refreshing] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          paddingTop: 25,
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
    </View>
  );
}

/**
 * @description Show when tab Tour activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function TourTab({ navigation }) {
  const [tours] = useState(TourData);
  const { colors } = useTheme();
  const [refreshing] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          paddingTop: 25,
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
    </View>
  );
}

/**
 * @description Show when tab Package activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function PackageTab({ navigation }) {
  const [tours] = useState(TourData);
  const { colors } = useTheme();
  const [refreshing] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          paddingTop: 25,
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
    </View>
  );
}
