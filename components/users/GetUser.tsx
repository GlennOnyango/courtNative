import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Divider, Searchbar, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetUser({ editItem }) {
  const [data, setData] = useState<any[]>([]);
  const [filterData, setFilteredData] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = React.useState("");


  const onChangeSearch = (query) => setSearchQuery(query);


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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  searchBar: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  containerList: {
    flex: 1,
    maxWidth: "100%",
  },
});
