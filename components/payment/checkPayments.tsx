import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Divider, Searchbar, List } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";
import SelectSpecial from "../selectSpecial";

export default function GetPayments({ editItem, openAddCourt }) {
  //create a filter button to filter by date
  const [data, setData] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [filterSelected, setFilter] = useState("");
  
  const [filterData, setFilteredData] = useState([]);

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

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
      <SelectSpecial
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
        selectedData={filterSelected}
        setData={setFilter}
        list={[]}
        label="Filter by"
      />

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.containerList}>
        {dataArray.map((item, index) => (
          <>
            <View style={{ flexDirection: "row", alignItems: "stretch" }}>
              <List.Item
                title={item.Name}
                right={(props) => (
                  <List.Icon {...props} icon="note-edit-outline" />
                )}
                onPress={() => editItem(item)}
                key={index}
                style={{ width: "90%" }}
              />
              <IconButton
                icon="delete"
                iconColor={MD3Colors.error50}
                style={{ width: "10%" }}
                onPress={() => console.log(item)}
              />
            </View>

            <Divider bold={true} horizontalInset={true} />
          </>
        ))}
      </View>
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
