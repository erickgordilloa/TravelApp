import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  blockLocationContent: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 8,
    padding: 10,
  },

  cover: {
    width: "100%",
    height: Utils.scaleWithPixel(170),
  },
  blockContentAddress: {
    flexDirection: "row",
    marginTop: 3,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    backgroundColor: "#eee",
    margin: 50,
  },
});
