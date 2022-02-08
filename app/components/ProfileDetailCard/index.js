import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor, useTheme, Images } from "@config";

export default function ProfileDetailCard(props) {
  const { colors } = useTheme();
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    textFirst,
    point,
    textSecond,
    textThird,
    icon,
  } = props;
  console.log("image", image);

  const [errorImage, setErrorImage] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.contain, style, { marginTop: 0 }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.contentLeft, styleLeft]}>
        <View>
          <Image
            source={errorImage ? Images.avatar : image}
            onError={(e) => {
              console.log("error images", e);
              setErrorImage(true);
            }}
            style={[
              styles.thumb,
              styleThumb,
              {
                overflow: "hidden",
              },
            ]}
          />
        </View>
        <View style={{ alignItems: "flex-start" }}>
          <Text footnote semibold numberOfLines={1}>
            {textFirst}
          </Text>
          <Text
            footnote
            semibold
            style={{
              marginTop: 3,
              paddingRight: 10,
            }}
            numberOfLines={1}
          >
            {textSecond}
          </Text>
          <Text footnote grayColor numberOfLines={1}>
            {textThird}
          </Text>
        </View>
      </View>
      {icon && (
        <View style={[styles.contentRight, styleRight]}>
          <Icon
            name="angle-right"
            size={18}
            color={BaseColor.grayColor}
            enableRTL={true}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

ProfileDetailCard.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
};

ProfileDetailCard.defaultProps = {
  image: "",
  textFirst: "",
  textSecond: "",
  icon: true,
  point: "",
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {},
};
