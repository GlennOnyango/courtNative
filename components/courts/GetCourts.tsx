import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Divider, Searchbar, List } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";

type Props = {
  editItem: any;
  openAddCourt: any;
}

export default function GetCourts({ editItem, openAddCourt }:Props) {
  const [data, setData] = useState([]);
  const [filterData, setFilteredData] = useState([]);


  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query:string) => setSearchQuery(query);


  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredData(data.filter((e:any) => e.Name.includes(searchQuery)));
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
        {dataArray.map((item:any, index:number) => (
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
