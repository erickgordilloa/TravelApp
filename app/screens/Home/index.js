import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  View,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BaseStyle, useTheme, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, TourItem, TextInput } from "@components";
import styles from "./styles";
import { TourData } from "@data";
import { useTranslation } from "react-i18next";
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux";
import { TripsAlbumsActions } from "@actions";

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  const [tours] = useState(TourData);

  const homeList = useSelector((state) => state.homeList);
  const { error, listHome, loading } = homeList;
  console.log("homeList", homeList);

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

  const getHomeList = () => {
    dispatch(TripsAlbumsActions.getHome());
  };

  useEffect(() => {
    getHomeList();
  }, [dispatch]);

  useEffect(() => {
    if (error.length === 0) return;

    Alert.alert("Error", error, [
      {
        text: "Ok",
        onPress: () => dispatch(TripsAlbumsActions.onRemoveErrorHome()),
      },
    ]);
  }, [error]);

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          columnWrapperStyle={{
            paddingLeft: 5,
            paddingRight: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={loading}
              onRefresh={() => getHomeList()}
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
          data={listHome}
          key={"gird"}
          keyExtractor={(item, index) => item.idtrip}
          renderItem={({ item, index }) => (
            <TourItem
              grid
              image={{ uri: item.picture }}
              name={item.title}
              author={{
                image: { uri: item.avatar },
                name: item.user_name,
              }}
              style={{
                marginBottom: 15,
                marginLeft: 15,
              }}
              onPress={() => {
                navigation.navigate("AlbumDetail", {
                  idTrip: item.idtrip,
                });
              }}
            />
          )}
        />
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
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          renderContent()
        )}
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
