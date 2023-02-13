import { StyleSheet, View } from "react-native";
import React from "react";

import AuthContext from "../context/AuthContext";
import AddUser from "../components/AddUser";

export default function User({ navigation }) {
  const ctx = React.useContext(AuthContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: `${ctx.user.role}`,
    });
  }, [ctx.user]);

  //navigation.setParams({ title: "value" })

  return <View style={styles.container}>
    <AddUser/>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
