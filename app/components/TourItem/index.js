import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Image,
  Text,
  Icon,
  StarRating,
  Tag,
  ProfileDetail,
  Button,
} from "@components";
import { BaseColor, useTheme } from "@config";
import PropTypes from "prop-types";
import styles from "./styles";
import { useTranslation } from "react-i18next";
export default function TourItem(props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const {
    list,
    block,
    grid,
    style,
    image,
    name,
    price,
    rate,
    rateCount,
    author,
    onPress,
    onPressUser,
    onPressBookNow,
    location,
    startTime,
    services,
    travelTime,
  } = props;

  /**
   * Display Tour item as block
   */
  const renderBlock = () => {
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
          <View
            style={[
              styles.blockPriceContent,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text title3 whiteColor semibold>
              {price}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
          <ProfileDetail
            image={author.image}
            textFirst={name}
            textSecond={author.name}
            point={author.point}
            icon={false}
            style={{ marginTop: 10 }}
            onPress={onPressUser}
          />
          <View style={styles.blockDetailContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <StarRating
                disabled={true}
                starSize={10}
                maxStars={5}
                rating={rate}
                selectedStar={(rating) => {}}
                fullStarColor={BaseColor.yellowColor}
              />

              <Text
                caption1
                grayColor
                semibold
                style={{
                  marginLeft: 10,
                  marginRight: 3,
                }}
              >
                {t("rating")}
              </Text>
              <Text caption1 primaryColor semibold>
                {rateCount}
              </Text>
            </View>
            <Tag outline round style={{ height: 30 }} onPress={onPressBookNow}>
              {t("book_now")}
            </Tag>
          </View>
        </View>
      </View>
    );
  };

  /**
   * Display Tour item as list
   */
  const renderList = () => {
    return (
      <View
        style={[
          styles.listContent,
          {
            backgroundColor: colors.card,
            padding: 10,
            margin: 15,
            borderRadius: 15,
            /*  shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 3, */
          },
          style,
        ]}
      >
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.listImageCard} />
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <Text headline semibold>
            {name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <View style={styles.listContentIcon}>
              <Icon
                name="map-marker-alt"
                color={BaseColor.grayColor}
                size={10}
              />
              <Text
                caption1
                grayColor
                style={{
                  marginLeft: 3,
                }}
              >
                {location}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              padding: 10,
              alignContent: "center",
              alignSelf: "flex-end",
              borderRadius: 15,
            }}
            onPress={() =>
              navigation.navigate("CheckOut", {
                bookingType: "Event",
              })
            }
          >
            <Text style={{ color: "white" }}>Ver reseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   * Display Tour item as grid
   */
  const renderGrid = () => {
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.girdImage} />
        </TouchableOpacity>
        <View style={styles.girdContentLocation}>
          <Icon name="map-marker-alt" color={colors.primary} size={10} />
          <Text
            caption2
            grayColor
            style={{
              marginLeft: 3,
            }}
          >
            {location}
          </Text>
        </View>
        <Text
          body2
          semibold
          style={{
            marginTop: 5,
          }}
          numberOfLines={1}
        >
          {name}
        </Text>
        <View style={styles.girdContentRate}>
          <Text caption1 accentColor>
            {travelTime}
          </Text>
        </View>
        <Text
          title3
          primaryColor
          semibold
          style={{
            marginTop: 5,
          }}
        >
          {price}
        </Text>
      </View>
    );
  };

  if (grid) return renderGrid();
  else if (block) return renderBlock();
  else return renderList();
}

TourItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  location: PropTypes.string,
  startTime: PropTypes.string,
  price: PropTypes.string,
  travelTime: PropTypes.string,
  rateCount: PropTypes.string,
  rate: PropTypes.number,
  numReviews: PropTypes.number,
  author: PropTypes.object,
  services: PropTypes.array,
  onPress: PropTypes.func,
  onPressBookNow: PropTypes.func,
  onPressUser: PropTypes.func,
};

TourItem.defaultProps = {
  style: {},
  list: true,
  block: false,
  grid: false,
  image: "",
  name: "",
  location: "",
  price: "",
  rate: 0,
  rateCount: "",
  numReviews: 0,
  travelTime: "",
  startTime: "",
  author: {},
  services: [],
  onPress: () => {},
  onPressBookNow: () => {},
  onPressUser: () => {},
};
