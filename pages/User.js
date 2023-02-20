import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import AuthContext from "../context/AuthContext";
import AddUser from "../components/AddUser";
import GetUser from "../components/GetUser";

export default function User({ navigation }) {
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
        <GetUser editItem={getEditItem}/>
      </View>
      {/* <View style={styles.containerAddUser}>
        <AddUser editItem={edit}/>
      </View> */}
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
