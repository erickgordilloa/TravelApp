import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
  //css Gird
  girdContent: {
    flexDirection: "column",
    flex: 1,
  },
  girdImage: {
    borderRadius: 3,
    height: Utils.scaleWithPixel(120),
    width: "100%",
  },
  girdContentLocation: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  girdContentRate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  customCard: {
    backgroundColor: "white",
    padding: 10,
    margin: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  /* shadowCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },

  customCard: {
    backgroundColor: colors.card,
    padding: 10,
    margin: 15,
    borderRadius: 15,
  }, */

  //css List
  listContentService: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
    marginRight: 5,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 10,
  },
  listContentRate: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  listContentIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  listContentRight: {
    marginHorizontal: 10,
    flex: 1,
  },
  listImage: {
    height: Utils.scaleWithPixel(150, 1),
    width: Utils.scaleWithPixel(120, 1),
    borderRadius: 8,
  },
  listImageCard: {
    height: Utils.scaleWithPixel(120, 1),
    width: Utils.scaleWithPixel(120, 1),
    borderRadius: 8,
  },
  listContent: {
    flexDirection: "row",
  },
  //css block
  blockPriceContent: {
    position: "absolute",
    top: 10,
    left: 20,
    borderRadius: 8,
    padding: 5,
  },
  blockLocationContent: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 8,
    padding: 5,
  },
  blockDetailContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blockImage: {
    height: Utils.scaleWithPixel(200),
    width: "100%",
  },
});
