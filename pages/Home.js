import { StyleSheet, FlatList, ScrollView, View, Image } from "react-native";
import React from "react";

import CardButton from "../components/Card";
import Button from "../components/Button";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { Card } from "react-native-paper";
const PlaceholderImage = require("../assets/images/admin1.jpg");

export default function Admin({ navigation }) {
  const ctx = React.useContext(AuthContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: `Admin`,
    });
  }, [ctx.user]);

  const modules = [
    {
      key: "Users",
      press: () => navigation.navigate(`User`),
      child: <FontAwesome name="users" size={32} color="#ad1457" />,
    },
    {
      key: "Bills",
      press: () => alert("bills"),
      child: (
        <FontAwesome5 name="money-bill-wave-alt" size={32} color="#ad1457" />
      ),
    },
    {
      key: "Courts",
      press: () => navigation.navigate(`Courts`),
      child: <Fontisto name="treehouse" size={32} color="#ad1457" />,
    },
    {
      key: "Residents",
      press: () => alert("tenant"),
      child: (
        <MaterialIcons name="person-pin-circle" size={32} color="#ad1457" />
      ),
    },
    {
      key: "Block",
      press: () => navigation.navigate(`AddBlock`),
      child: <FontAwesome5 name="house-user" size={32} color="#ad1457" />,
    },
    {
      key: "Tenant",
      press: () => alert("tenant"),
      child: (
        <MaterialCommunityIcons name="finance" size={32} color="#ad1457" />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
          data={modules}
          key={3}
          numColumns={3}
          renderItem={({ item }) => (
            <CardButton
              onPress={item.press}
              name={item.key}
              childern={item.child}
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          theme="primary"
          label="have complaint or need help"
          disbaled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 2,
  },
  cardsContainer: {
    flex: 2,
    alignItems: "center",
  },
  buttonContainer: {
    height: 50,
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius:16,
    borderBottomRightRadius:16,
  },
});
