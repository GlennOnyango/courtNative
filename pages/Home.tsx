import React from "react";

import { StyleSheet, View, ScrollView } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import AuthContext from "../context/AuthContext";
import { Card, Text } from "react-native-paper";
import CardHome from "../components/cardBriefHome";
import CardOptions from "../components/cardOptions";

export default function Admin({ navigation }) {
  const ctx = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Card style={styles.cardStyle} elevation={1}>
        <Card.Title
          title="Manage Your Residents"
          subtitle={`welecome ${ctx.user.Name}`}
          subtitleStyle={{
            textAlign: "center",
            color: "#ffffff",
            marginTop: 4,
          }}
          titleStyle={styles.cardText}
        />
        <Card.Content style={styles.cardContent}>
          <CardHome firstText="100" secondText="Residents" />

          <CardHome firstText="110" secondText="Homes" />

          <CardHome firstText="2" secondText="Admins" />
        </Card.Content>
      </Card>

      <View style={styles.cardsContainer}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="titleLarge" style={{ textAlign: "left" }}>
            Administrative options
          </Text>
          <Entypo name="list" size={24} color="black" />
        </View>

        <ScrollView style={{ backgroundColor: "transparent" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
              backgroundColor: "transparent",
            }}
          >
            <CardOptions
              firstText="Users"
              secondText="200"
              Icon={<FontAwesome name="users" size={24} color="white" />}
              press={`User`}
              navigation={navigation}
            />

            <CardOptions
              firstText="Courts"
              secondText="200"
              Icon={<Fontisto name="treehouse" size={24} color="white" />}
              press={`Courts`}
              navigation={navigation}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
            }}
          >
            <CardOptions
              firstText="Block"
              secondText="200"
              Icon={<FontAwesome5 name="house-user" size={24} color="white" />}
              press={`Block`}
              navigation={navigation}
            />

            <CardOptions
              firstText="Bills"
              secondText="2"
              Icon={
                <FontAwesome5
                  name="money-bill-wave-alt"
                  size={24}
                  color="white"
                />
              }
              press={`Bills`}
              navigation={navigation}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
            }}
          >
            <CardOptions
              firstText="Residents"
              secondText="86"
              Icon={
                <MaterialIcons
                  name="person-pin-circle"
                  size={24}
                  color="white"
                />
              }
              press={`Residents`}
              navigation={navigation}
            />

            <CardOptions
              firstText="Notifications"
              secondText="10"
              Icon={<AntDesign name="notification" size={24} color="white" />}
              press={`Notifications`}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e5f5",
  },

  cardStyle: {
    height: "30%",
    zIndex: 1,
    borderRadius: 0,
    backgroundColor: "#000000",
  },
  cardsContainer: {
    height: "70%",
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 24,
    marginTop: 4,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
