import React, { useState, useEffect } from "react";
import { baseUrl } from "../../api/mainApi";
import {
  View,
  Alert,
  Animated,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BaseColor, Images, useTheme } from "@config";
import {
  SafeAreaView,
  Icon,
  Text,
  TourItem,
  ProfileGroup,
  Tag,
} from "@components";
import { useDispatch, useSelector } from "react-redux";
import { TripsAlbumsActions } from "@actions";
import * as Utils from "@utils";
import styles from "./styles";
import { TourData } from "@data";
import { FloatingAction } from "react-native-floating-action";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";

export default function AlbumDetail({ navigation, route }) {
  const { idTrip } = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const tripsAlbumsId = useSelector((state) => state.tripsAlbumsId);
  const { error, infoTripsAlbums, loading } = tripsAlbumsId;

  const tripFilesList = useSelector((state) => state.tripFilesList);
  const { error: errorFiles, tripFiles, loading: loadingFiles } = tripFilesList;

  console.log("tripFiles", tripFiles);

  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [tours] = useState(TourData);
  const [refreshing] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadCover, setLoadCover] = useState(false);
  const deltaY = new Animated.Value(0);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 75;

  const actions = [
    {
      text: "Select images",
      icon: <Icon name="camera" size={18} color={"white"} />,
      name: "camera",
      position: 1,
    },
    {
      text: "Edit trip",
      icon: <Icon name="pencil-alt" size={18} color={"white"} />,
      name: "edit",
      position: 2,
    },
    {
      text: "Delete this trip",
      icon: <Icon name="trash" size={18} color={"white"} />,
      name: "trash",
      color: "red",
      position: 2,
    },
  ];

  const openCameraSelectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log(images);
      handleSubmitPhoto(images);
    });
  };

  const handleSubmitPhoto = async (images) => {
    setLoad(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var formdata = new FormData();
    formdata.append("idtrip", idTrip);
    images.forEach((element) => {
      formdata.append("files-trip[]", {
        uri: element.path,
        name: element.filename,
        type: element.mime,
      });
    });
    console.log("formdata", formdata);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${baseUrl}/TripUploadFiles`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        console.log("result", result);
        Alert.alert("Info", result.info.msg, [
          {
            text: "Ok",
            onPress: () =>
              dispatch(TripsAlbumsActions.getTripsAlbumFiles(idTrip)),
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
      });
  };

  const setCoverImage = async (images) => {
    setLoadCover(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var formdata = new FormData();
    formdata.append("idtrip", idTrip);
    formdata.append("cover-trip", {
      uri: images.path,
      name: images.filename,
      type: images.mime,
    });
    console.log("formdata", formdata);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${baseUrl}/TripSetCoverImage`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoadCover(false);
        console.log("result", result);
        Alert.alert("Info", result.info.msg, [
          {
            text: "Ok",
            onPress: () => dispatch(TripsAlbumsActions.getTripsAlbumId(idTrip)),
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        setLoadCover(false);
      });
  };

  const openCameraEditCover = () => {
    ImagePicker.openPicker({
      multiple: false,
    })
      .then((images) => {
        setCoverImage(images);
      })
      .catch((error) => {
        console.log("errorimage", error);
      });
  };

  const loadInfo = () => {
    dispatch(TripsAlbumsActions.getTripsAlbumId(idTrip));
    dispatch(TripsAlbumsActions.getTripsAlbumFiles(idTrip));
  };
  useEffect(() => {
    loadInfo();
  }, [dispatch]);

  const showModalDelete = () => {
    Alert.alert(
      "Do you really want to delete this trip?",
      "All added photos and info will be delete too",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("OK Pressed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };

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
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {
                loadInfo();
              }}
            />
          }
          ListHeaderComponent={
            <>
              <View>
                <Animated.Image
                  source={{ uri: infoTripsAlbums?.cover }}
                  style={[
                    styles.imgBanner,
                    {
                      height: deltaY.interpolate({
                        inputRange: [
                          0,
                          Utils.scaleWithPixel(200),
                          Utils.scaleWithPixel(200),
                        ],
                        outputRange: [
                          heightImageBanner,
                          heightHeader,
                          heightHeader,
                        ],
                      }),
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.closeButtom}
                >
                  <Icon
                    name="times"
                    size={20}
                    color={"white"}
                    enableRTL={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openCameraEditCover()}
                  style={styles.cameraButtom}
                >
                  <Icon
                    name="camera"
                    size={20}
                    color={colors.primary}
                    enableRTL={true}
                  />
                </TouchableOpacity>
              </View>

              <SafeAreaView
                edges={["right", "left"]}
                style={{ flex: 1, position: "relative" }}
              >
                <View style={{ margin: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text title1 bold style={{ marginBottom: 3 }}>
                        {infoTripsAlbums?.title}
                      </Text>
                      <Tag outline round style={{ height: 30 }}>
                        {infoTripsAlbums?.date_star} -{" "}
                        {infoTripsAlbums?.date_end}
                      </Tag>
                    </View>
                  </View>
                  <ProfileGroup
                    onPress={() => console.log(12)}
                    onPressLove={() => console.log("love")}
                    name="Steve, Lincoln, Harry"
                    detail={`15 people_like_this`}
                    users={[
                      { image: Images.profile1 },
                      { image: Images.profile3 },
                      { image: Images.profile4 },
                    ]}
                  />
                </View>

                {/* <Text
                body2
                style={{ marginLeft: 20, marginRight: 20, marginBottom: 15 }}
              >
                218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor
                incididunt ut labore et dolore
              </Text> */}
                {load && (
                  <>
                    <ActivityIndicator size="large" color={colors.primary} />
                  </>
                )}
                {loadingFiles ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size="large" color={colors.primary} />
                  </View>
                ) : (
                  <>
                    <FlatList
                      style={{ marginRight: 20, marginLeft: 5 }}
                      showsVerticalScrollIndicator={false}
                      numColumns={2}
                      data={tripFiles}
                      key={"gird"}
                      keyExtractor={(item, index) => item.idfile}
                      renderItem={({ item, index }) => (
                        <TourItem
                          grid
                          tagLocation={true}
                          image={{ uri: item.file }}
                          name={item.descripcion}
                          style={{ marginBottom: 15, marginLeft: 15 }}
                          onPress={() => {
                            navigation.navigate("AlbumDetailImage", {
                              detailImage: item,
                            });
                          }}
                        />
                      )}
                    />
                  </>
                )}
              </SafeAreaView>
            </>
          }
        />
      )}

      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          if (name === "camera") {
            openCameraSelectImages();
          } else if (name === "edit") {
            navigation.navigate("AlbumEdit", {
              album: infoTripsAlbums,
            });
          } else if (name === "trash") {
            showModalDelete();
          }
        }}
      />
    </>
  );
}
