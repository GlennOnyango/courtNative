import { StyleSheet, View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebaseConfig";
import { Searchbar } from "react-native-paper";
import { AnimatedFAB } from "react-native-paper";

export default function GetCourts({ editItem }) {
  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState([]);

  const database = getDatabase(app);
  const starCountRef = ref(database, `court/`);

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredData(data.filter((e) => e.Name.includes(searchQuery)));
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.containerList}>
        <FlatList
          data={searchQuery.length > 0 ? filterData : data}
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
              <View style={{ width: "80%", justifyContent: "center" }}>
                <Text style={styles.item}>{item.Name}</Text>
              </View>
              <View style={{ width: "10%" }}>
                <Button
                  theme="icon"
                  onPress={() => editItem(item)}
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

        <AnimatedFAB
          icon={"plus"}
          label={"Label"}
          extended={true}
          onPress={() => console.log("Pressed")}
          visible={true}
          animateFrom={"right"}
          iconMode={"static"}
          style={styles.fabStyle}
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
  searchBar: {
    margin: 5,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
