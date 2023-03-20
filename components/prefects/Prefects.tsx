import React from "react";

import { StyleSheet, View } from "react-native";


import { Text } from "react-native-paper";

export default function Admin({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Get</Text>
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
