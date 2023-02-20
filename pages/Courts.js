import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import AuthContext from "../context/AuthContext";
import AddCourt from "../components/courts/AddCourt";
import GetCourts from "../components/courts/GetCourts";

export default function Courts({ navigation }) {
  const ctx = React.useContext(AuthContext);
  const [edit,setEdit] = useState({});

  React.useEffect(() => {
    navigation.setOptions({
      title: `${ctx.user.role}`,
    });
  }, [ctx.user]);

  const getEditItem = (item)=>{
    setEdit(item)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerViewUser}>
        <GetCourts editItem={getEditItem}/>
      </View>
      <View style={styles.containerAddUser}>
        <AddCourt item={edit}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerViewUser:{
    height:"70%",
    backgroundColor: "#fff",
  },
  containerAddUser:{
    height:"30%",
    backgroundColor: "#e3f2fd",
  }
});
