import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { BaseStyle, useTheme, BaseColor } from "@config";
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
import styles from "./styles";
import { useTranslation } from "react-i18next";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { TripsAlbumsActions } from "@actions";

export default function AlbumCreate({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  //dispatch(TripsAlbumsActions.onRemoveErrorCreateTrip());

  const [nameTrip, setNameTrip] = useState();
  const [option, setOption] = useState("Public");
  const [dateStart, setDateStart] = useState("Date Start");
  const [dateEnd, setDateEnd] = useState("Date End");
  const [date_start, setDate_Start] = useState("");
  const [date_end, setDate_End] = useState("");
  const [description, setDescription] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);

  const createAlbum = () => {
    dispatch(
      TripsAlbumsActions.createTripsAlbums(
        nameTrip,
        option,
        date_start,
        date_end,
        description
      )
    );
  };

  const tripAlbumCreate = useSelector((state) => state.tripAlbumCreate);
  const { error, reset, createtripAlbum, loading } = tripAlbumCreate;
  console.log("tripAlbumCreate", tripAlbumCreate);

  useEffect(() => {
    if (createtripAlbum) {
      Alert.alert("Exito", "Create trips success", [
        {
          text: "Ok",
          onPress: () => dispatch(TripsAlbumsActions.onGoBackCreateTrip()),
        },
      ]);
    }
  }, [createtripAlbum]);

  useEffect(() => {
    if (reset) {
      dispatch(TripsAlbumsActions.onRemoveErrorCreateTrip());
      dispatch(TripsAlbumsActions.getTripsAlbum());
      navigation.goBack();
    }
  }, [reset]);

  useEffect(() => {
    if (error.length === 0) return;

    Alert.alert("Create Album", error, [
      {
        text: "Ok",
        onPress: () => dispatch(TripsAlbumsActions.onRemoveErrorCreateTrip()),
      },
    ]);
  }, [error]);

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

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Create Trip"}
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
            {/* <View>
              <Image source={image} style={styles.thumb} />
            </View> */}
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
                createAlbum();
              }}
            >
              Create Trip
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
