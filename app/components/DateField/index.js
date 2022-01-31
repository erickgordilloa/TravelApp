import React from "react";
import {
  TextInput,
  View,
  I18nManager,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import PropTypes from "prop-types";
import { BaseStyle, BaseColor, useTheme } from "@config";

export default function Index(props) {
  const { colors } = useTheme();
  const cardColor = colors.card;
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
  } = props;
  return (
    <TouchableWithoutFeedback onPress={() => onChangeText()}>
      <View style={[BaseStyle.textInputDate, style]}>
        <Text
          style={{
            color:
              value === "Date Start" || value === "Date End"
                ? BaseColor.grayColor
                : BaseColor.blackColor,
          }}
        >
          {value}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  onSubmitEditing: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  onChangeText: (text) => {},
  onFocus: () => {},
  placeholder: "Placeholder",
  value: "",
  success: true,
  secureTextEntry: false,
  keyboardType: "default",
  multiline: false,
  textAlignVertical: "center",
  icon: null,
  onSubmitEditing: () => {},
};
