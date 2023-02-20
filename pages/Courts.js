import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import AuthContext from "../context/AuthContext";
import AddCourt from "../components/courts/AddCourt";
import GetCourts from "../components/courts/GetCourts";

export default function Courts({ navigation }) {
  const ctx = React.useContext(AuthContext);
  const [edit, setEdit] = useState({});

  React.useEffect(() => {
    navigation.setOptions({
      title: `${ctx.user.role}`,
    });
  }, [ctx.user]);

  const getEditItem = (item) => {
    setEdit(item);
  };

  const AddCourt = () => {
    navigation.navigate("Add Courts");
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.containerViewUser}>
           <AddCourt item={edit} />
         </View> */}
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
  // containerAddUser:{
  //   height:"30%",
  //   backgroundColor: "#e3f2fd",
  // }
});
