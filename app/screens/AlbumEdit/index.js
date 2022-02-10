import React, { useState } from "react";
import { baseUrl } from "../../api/mainApi";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BaseStyle, useTheme, BaseColor, Images } from "@config";
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
  DateField,
} from "@components";
import axios from "axios";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { TripsAlbumsActions } from "@actions";

export default function AlbumEdit({ navigation, route }) {
  const { album } = route.params;
  console.log("album", album);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const dispatch = useDispatch();

  const [nameTrip, setNameTrip] = useState(album?.title || "");
  const [option, setOption] = useState(album?.option || "Public");
  const [dateStart, setDateStart] = useState(album?.date_star || "Date Start");
  const [dateEnd, setDateEnd] = useState(album?.date_end || "Date End");
  const [description, setDescription] = useState(album?.descripcion || "");
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
  const [date_start, setDate_Start] = useState(album?.date_star || "");
  const [date_end, setDate_End] = useState(album?.date_end || "");
  const [image, setImage] = useState(album?.cover || "");
  const [mine, setMine] = useState("");
  const [filename, setFilename] = useState("");
  const [imageSend, setImageSend] = useState("");

  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { token } = auth;
  console.log("token", token);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePickerEnd = () => {
    setDatePickerVisibilityEnd(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePickerEnd = () => {
    setDatePickerVisibilityEnd(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDateStart(moment(date).format("MMMM, Do YYYY"));
    setDate_Start(moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };
  const handleConfirmEnd = (date) => {
    console.log("A date has been picked: ", date);
    setDateEnd(moment(date).format("MMMM, Do YYYY"));
    setDate_End(moment(date).format("YYYY-MM-DD"));
    hideDatePickerEnd();
  };

  const openCameraEditCover = () => {
    ImagePicker.openPicker({
      multiple: false,
    }).then((images) => {
      console.log("images", images);
      setImage(images.path);
      setImageSend(images.sourceURL);
      setFilename(images.filename);
      setMine(images.mime);
    });
  };

  const handleSubmitEdit = async () => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("name_trip", nameTrip);
    formdata.append("option", option);
    formdata.append("date_star", date_start);
    formdata.append("date_end", date_end);
    formdata.append("descripcion", description);
    formdata.append("idtrip", album?.idtrip);
    formdata.append("cover-trip", {
      uri: image,
      name: filename,
      type: mine,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${baseUrl}/TripUpdate`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        navigation.goBack();
        Alert.alert("Success", result.info.msg, [
          {
            text: "Ok",
            onPress: () =>
              dispatch(TripsAlbumsActions.getTripsAlbumId(album?.idtrip)),
          },
        ]);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Edit Trip"}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}
        >
          <DateTimePickerModal
            isVisible={isDatePickerVisibleEnd}
            mode="date"
            onConfirm={handleConfirmEnd}
            onCancel={hideDatePickerEnd}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <ScrollView contentContainerStyle={styles.contain}>
            <TouchableOpacity onPress={openCameraEditCover}>
              <Image source={{ uri: image }} style={styles.thumb} />
            </TouchableOpacity>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Trip Name
              </Text>
            </View>
            <TextInput
              onChangeText={(text) => setNameTrip(text)}
              placeholder={"Name Trip"}
              value={nameTrip}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Who can see this trip?
              </Text>
            </View>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => setOption(value)}
              value={option}
              items={[
                { label: "Public", value: "Public" },
                { label: "Private", value: "Private" },
                { label: "OnlyMe", value: "OnlyMe" },
              ]}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Date Start
              </Text>
            </View>
            <DateField value={dateStart} onChangeText={showDatePicker} />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Date End
              </Text>
            </View>
            <DateField value={dateEnd} onChangeText={showDatePickerEnd} />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Description
              </Text>
            </View>
            <TextInput
              onChangeText={(text) => setDescription(text)}
              placeholder={"Description"}
              value={description}
            />
          </ScrollView>
          <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
            <Button
              loading={loading}
              full
              round
              onPress={() => {
                handleSubmitEdit();
              }}
            >
              Edit Trip
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#efefef",
    color: "#212121",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginTop: 10,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#efefef",
    borderRadius: 8,
    color: "#212121",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
