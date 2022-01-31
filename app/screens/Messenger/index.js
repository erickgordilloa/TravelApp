import React, { useState } from "react";
import { RefreshControl, FlatList, View } from "react-native";
import { BaseStyle, useTheme } from "@config";
import { Header, SafeAreaView, ListThumbSquare } from "@components";
import { MessagesData } from "@data";

export default function Messenger({ navigation }) {
  const { colors } = useTheme();

  const [refreshing] = useState(false);
  const [messenger] = useState(MessagesData);

  console.log("ESTOY EN LISTA DE CHATS");

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Chat"} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "left", "bottom"]}
      >
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={messenger}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <ListThumbSquare
              onPress={() => {
                navigation.navigate("Messages");
                console.log(12);
              }}
              image={item.image}
              txtLeftTitle={item.user}
              txtContent={item.message}
              txtRight={item.date}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}
