import {
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList,
  } from "react-native";
  import React, { useState, useEffect, useLayoutEffect } from "react";
  import Button from "../Button";
  import { useNavigation } from "@react-navigation/native";
  import { Feather } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { getDatabase, ref, onValue } from "firebase/database";
  import { app } from "../../firebaseConfig";
  
  export default function GetCourts({editItem}) {
    const [data,setData] = useState([]);
    const [filterData,setFilteredData] = useState([]);
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
  
    const database = getDatabase(app);
    const starCountRef = ref(database, `court/`);
  
    // Customize header
    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: "asdads",
        headerTitle: () => (
          <TextInput
            style={styles.input}
            placeholder="Search User"
            onChangeText={setSearch}
            inputMode={"text"}
            keyboardType={"default"}
          />
        ),
      });
    }, [navigation]);
  
  
  useEffect(()=>{
    onValue(starCountRef, (snapshot) => {
      const userData = [];
  
      if (snapshot.exists()) {
        const data = snapshot.val();
  
        for (const user in data) {
            userData.push(data[user]);
        }
      }
  
      setData(userData);
    });
  },[]);
  
  useEffect(()=>{
    if (search.length > 0) {
    setFilteredData(data.filter((e)=>e.Name.includes(search)));  
    }
  },[search]);
  
  
    return (
        <View style={styles.container}>
          <View style={styles.containerList}>
            <FlatList
              data={search.length > 0 ? filterData : data}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    height: 50,
                    borderBottomColor: "black",
                    paddingLeft: 4,
                    borderBottomWidth: 1,
                  }}
                  key={index}
                >
  
                  <View
                    style={{ width: "80%", justifyContent: "center" }}
                  >
                    <Text style={styles.item}>
                      {item.Name}
                    </Text>
                  </View>
                  <View style={{ width: "10%" }}>
                    <Button
                      theme="icon"
                      onPress={() =>editItem(item)}
                      btnIcon={<Feather name="edit" size={24} color="black" />}
                    />
                  </View>
  
                  <View style={{ width: "10%" }}>
                    <Button
                      theme="icon"
                      onPress={() => alert(index)}
                      btnIcon={
                        <AntDesign name="deleteuser" size={24} color="black" />
                      }
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    containerSearch: {
      flex: 1,
      flexDirection: "row",
      maxWidth: "100%",
      padding: 8,
    },
    containerList: {
      flex: 8,
      maxWidth: "100%",
    },
    input: {
      width: "90%",
      height: 40,
      backgroundColor: "white",
      padding: 5,
    },
  });
  