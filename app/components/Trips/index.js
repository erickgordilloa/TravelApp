import React, { useState, useEffect } from "react";
import { View, FlatList, RefreshControl, Alert } from "react-native";
import { TourItem } from "@components";
import { useTheme } from "@config";
import { UserData, TourData } from "@data";
import { useDispatch, useSelector } from "react-redux";
import { TripsAlbumsActions } from "@actions";

const Trips = ({ navigation }) => {
  const [tours] = useState(TourData);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [refreshing] = useState(false);

  const tripsAlbums = useSelector((state) => state.tripsAlbums);
  const { error, tripsAlbums: dataAlbums, loading } = tripsAlbums;

  console.log("tripsAlbums", tripsAlbums);

  const getTripsAlbumData = () => {
    dispatch(TripsAlbumsActions.getTripsAlbum());
  };

  useEffect(() => {
    getTripsAlbumData();
  }, [dispatch]);

  useEffect(() => {
    if (error.length === 0) return;

    Alert.alert("Login incorrecto", error, [
      {
        text: "Ok",
        onPress: () => dispatch(TripsAlbumsActions.onRemoveError()),
      },
    ]);
  }, [error]);

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
            refreshing={loading}
            onRefresh={() => getTripsAlbumData()}
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
};

export default Trips;
