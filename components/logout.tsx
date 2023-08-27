import React, { useEffect } from "react";

import { StyleSheet } from "react-native";

import { FAB } from "react-native-paper";

import AuthContext from "../context/AuthContext";

export default function Logout({ navigation }) {
  const ctx = React.useContext(AuthContext);

  useEffect(() => {
    if (ctx.user.Phone === 0) {
      navigation.navigate("Login");
    }
  }, [ctx.user]);

  return (
    <FAB
      style={styles.fab}
      label="Logout"
      onPress={() => {
        ctx.logout();
      }}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
