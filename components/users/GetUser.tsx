import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { app } from "../../firebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { Divider, Searchbar, FAB, List } from "react-native-paper";

export default function GetUser({ editItem, openAddAdmin }) {
  const [data, setData] = useState<any[]>([]);
  const [filterData, setFilteredData] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = React.useState("");

  const database = getDatabase(app);
  const starCountRef = ref(database, `users/`);

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const userArrayData:any[] = [];

      if (snapshot.exists()) {
        const data:Record<string,any> = snapshot.val();

        for (const user in data) {
          userArrayData.push(data[user]);
        }
      }

      setData(userArrayData);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredData(data.filter((e) => e.Phone.includes(searchQuery)));
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
        {dataArray.map((item, index) => (
          <>
            <List.Item
              title={item.Name}
              right={(props) => (
                <List.Icon {...props} icon="note-edit-outline" />
              )}
              key={index}
              onPress={() => editItem(item)}
            />
            <Divider bold={true} horizontalInset={true} />
          </>
        ))}
      </View>

      <FAB
        icon="plus"
        label="Create admin"
        style={styles.fab}
        onPress={() => openAddAdmin()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  containerList: {
    flex: 8,
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
