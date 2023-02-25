import { StyleSheet, View } from "react-native";
import React from "react";

import AuthContext from "../context/AuthContext";
import GetUser from "../components/users/GetUser";

export default function User({ navigation }) {
  const ctx = React.useContext(AuthContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: `${ctx.user.role}`,
    });
  }, [ctx.user]);

  const getEditItem = (item)=>{
    
    navigation.navigate("Add User",{item});
  }
  
  const AddAdmin = () => {
    navigation.navigate("Add User");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerViewUser}>
        <GetUser editItem={getEditItem} openAddAdmin={AddAdmin}/>
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
    height:"100%",
    backgroundColor: "#fff",
  }
});
