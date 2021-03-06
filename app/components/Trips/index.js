import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TourItem } from "@components";
import { useTheme } from "@config";
import { useDispatch, useSelector } from "react-redux";
import { TripsAlbumsActions } from "@actions";

const Trips = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const tripsAlbums = useSelector((state) => state.tripsAlbums);
  const { error, tripsAlbums: dataAlbums, loading } = tripsAlbums;
  console.log("tripsAlbums", dataAlbums);

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
    <>
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
            data={dataAlbums}
            keyExtractor={(item, index) => item.idtrip}
            renderItem={({ item, index }) => (
              <TourItem
                grid
                image={{ uri: item.cover }}
                name={item.title}
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
      )}
    </>
  );
};

export default Trips;
