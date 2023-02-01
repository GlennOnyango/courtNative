import { StyleSheet, FlatList, ScrollView, View, Image } from "react-native";
import React from "react";

import CardButton from "../../components/Card";
import Button from "../../components/Button";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PlaceholderImage = require("../../assets/images/admin1.jpg");

export default function Admin() {
  const modules = [
    {
      key: "Users",
      press: () => alert("user"),
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
      press: () => alert("courts"),
      child: <Fontisto name="treehouse" size={32} color="#ad1457" />,
    },
    {
      key: "Tenant",
      press: () => alert("tenant"),
      child: <MaterialIcons name="person-pin-circle" size={32} color="#ad1457" />,
    },
    {
      key: "House",
      press: () => alert("house"),
      child: <FontAwesome5 name="house-user" size={32} color="#ad1457" />,
    },
    {
      key: "Tenant",
      press: () => alert("tenant"),
      child: <MaterialCommunityIcons name="finance" size={32} color="#ad1457" />,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={{ padding: 8 }}>
          <Image source={PlaceholderImage} style={styles.image} />
        </View>
        <View style={styles.cardsContainer}>
          <FlatList
            data={modules}
            numColumns={3}
            renderItem={({ item }) => (
              <CardButton
                onPress={item.press}
                name={item.key}
                childern={item.child}
              />
            )}
          />
          <Button theme="primary" label="have complaint or need help"  />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonApp: {
    backgroundColor: "blue",
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 18,
  },
});
