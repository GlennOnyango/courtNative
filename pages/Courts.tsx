import { StyleSheet, View } from "react-native";
import React from "react";

import GetCourts from "../components/courts/GetCourts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};


export default function Courts({ navigation }:Props) {
  const getEditItem = (item:any) => {
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
