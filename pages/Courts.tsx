import { StyleSheet, View } from "react-native";
import React from "react";

import GetCourts from "../components/courts/GetCourts";

export default function Courts({ navigation }) {
  const getEditItem = (item) => {
    navigation.navigate("Add Courts", { item });
  };

  const AddCourt = () => {
    navigation.navigate("Add Courts");
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerViewUser}>
        <GetCourts editItem={getEditItem} openAddCourt={AddCourt} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerViewUser: {
    height: "100%",
    backgroundColor: "#fff",
  },
});
