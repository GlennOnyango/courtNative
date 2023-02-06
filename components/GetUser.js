import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import AuthContext from "../context/AuthContext";
import { useFetch } from "../API/useFetch";

export default function GetUser({ navigation }) {
  const ctx = React.useContext(AuthContext);
  const [data, callApi, isLoading] = useFetch();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <View style={{ width: "80%", height: 50 }}>
            <TextInput
              style={styles.input}
              placeholder="Search User"
              onChangeText={(newText) =>
                addUser({ type: "Name", text: newText })
              }
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>
          <View style={{ width: "20%", height: 50, paddingHorizontal: 4 }}>
            <Button
              theme="primary"
              label="search"
              onPress={() => alert("asd")}
              disbaled={true}
            />
          </View>
        </View>
        <View style={styles.containerList}>
          <FlatList
            data={[
              { key: "Devin" },
              { key: "Dan" },
              { key: "Dominic" },
              { key: "Jackson" },
              { key: "James" },
              { key: "Joel" },
              { key: "John" },
              { key: "Jillian" },
              { key: "Jimmy" },
              { key: "Julie" },
            ]}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.key}</Text>
              
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    width: "100%",
    height: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 3,
  },
});
