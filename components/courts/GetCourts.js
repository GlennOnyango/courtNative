import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { app } from "../../firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { Divider, Searchbar,FAB,List } from "react-native-paper";

export default function GetCourts({ editItem, openAddCourt }) {
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

  const dataArray = useMemo(() => {
    if (searchQuery.length > 0) return filterData;
    return data;
  }, [searchQuery, data, filterData]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.containerList}>
        {dataArray.map((item) => (
          <>
            <List.Item
              title={item.Name}
              right={(props) => <List.Icon {...props} icon="note-edit-outline" />}
              onPress={() => editItem(item)}
            />
            <Divider bold={true} horizontalInset={true}/>
          </>
        ))}
      </View>

      <FAB icon="plus" label="Create court" style={styles.fab} onPress={() => openAddCourt()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerList: {
    height: "90%",
    maxWidth: "100%",
  },
  searchBar: {
    height: "10%",
    margin: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
