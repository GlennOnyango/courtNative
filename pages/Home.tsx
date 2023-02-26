import React from "react";

import { StyleSheet, View, Image, ScrollView } from "react-native";

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

const PlaceholderImage = require("../assets/images/admin1.jpg");

export default function Admin({ navigation }) {
  const ctx = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>

      <Card style={styles.cardStyle} elevation={1}>
        <Card.Title
          title="Manage Your Residents"
          subtitle={`welecome ${ctx.user.Name}`}
          subtitleStyle={{ textAlign: "center" }}
          titleStyle={styles.cardText}
        />
        <Card.Content style={styles.cardContent}>
          <CardHome firstText="100" secondText="Residents" />

          <CardHome firstText="110" secondText="Homes" />

          <CardHome firstText="20000" secondText="Collections" />
        </Card.Content>
      </Card>

      <View style={styles.cardsContainer}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal:8,
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

        <ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
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
              firstText="Courts"
              secondText="200"
              Icon={<Fontisto name="treehouse" size={24} color="white" />}
              press={`Courts`}
              navigation={navigation}
            />
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
  imageContainer: {
    height: "40%",
  },
  cardsContainer: {
    height: "60%",
    backgroundColor: "transparent",
    paddingTop: "25%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardStyle: {
    marginHorizontal: 16,
    position: "absolute",
    left: 0,
    top: "30%",
    width: "90%",
    height: "25%",
    zIndex: 1,
    borderRadius: 4,
    backgroundColor: "#1B1B1B",
  },
  cardText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginTop: 4,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
