import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

export default function Admin() {
  const PlaceholderImage = require("../../assets/images/background-image.png");
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image source={PlaceholderImage} style={styles.image} />

      <StatusBar style="auto" />
    </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "50%",
    height: "30%",
    borderRadius: "50%",
    marginBottom: "5%",
  },
  containerInput: {
    height: "auto",
    alignItems: "center",
    justifyContent: "start",
    zIndex: 1,
    padding: 5,
  },
  input: {
    width: 350,
    height: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 3,
  },
  buttonApp: {
    backgroundColor: "blue",
  },
});
