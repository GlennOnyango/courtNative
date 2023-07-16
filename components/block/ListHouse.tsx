import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { Divider, List, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "../../customHooks/useFetch";

type House = {
  houseName: string;
  houseOwner: string;
  courtId: string;
};

export default function HouseList() {
  const { data, callApi, isLoading } = useFetch();
  const [filterData, setFilteredData] = useState("");

  useEffect(() => {
    callApi("house/");
  }, []);

  const dataArray = useMemo(() => {
    //check if data is an array
    if (Array.isArray(data)) {
      if (filterData.length > 0)
        return data.filter((e: House) => e.houseName.includes(filterData));
      return data;
    }

    return [];
  }, [data, filterData]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(query: string) => setFilteredData(query)}
        value={filterData}
        style={styles.searchBar}
      />
      <View style={styles.containerList}>
        {dataArray?.map((item: House, index) => (
          <>
            <List.Item
              title={item.houseName}
              right={(props) => (
                <List.Icon {...props} icon="note-edit-outline" />
              )}
              key={index}
            />
            <Divider bold={true} horizontalInset={true} />
          </>
        ))}
        <Text style={{ textAlign: "center", marginTop:8 }}>
          {dataArray.length === 0 && "No data found"}</Text>
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
