import React from "react";

import { StyleSheet, View, ScrollView, Dimensions } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import AuthContext from "../context/AuthContext";
import { Card, Text, useTheme } from "react-native-paper";
import CardHome from "../components/cardBriefHome";
import CardOptions from "../components/cardOptions";

const { width, height } = Dimensions.get("window");

export default function Admin({ navigation }) {
  const ctx = React.useContext(AuthContext);
  const theme = useTheme();

  navigation.addListener("beforeRemove", (e) => {
    // Prevent default behavior of leaving the screen
    e.preventDefault();
  });
  return (
    <ScrollView style={styles.container}>
      <Card
        style={{ ...styles.cardStyle, backgroundColor: theme.colors.primary }}
        elevation={1}
      >
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
          <CardHome firstText="10" secondText="Residents" />

          <CardHome firstText="30" secondText="Homes" />

          <CardHome firstText="20" secondText="Admins" />
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
          <Text
            variant="titleLarge"
            style={{ textAlign: "left", color: theme.colors.primary }}
          >
            Administrative options
          </Text>
          <Entypo name="list" size={24} color={theme.colors.primary} />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e5f5",
  },

  cardStyle: {
    height: height * 0.3,
    zIndex: 1,
    borderRadius: 0,
  },
  cardsContainer: {
    height: height * 0.7,
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
