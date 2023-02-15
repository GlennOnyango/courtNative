import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import { useFetch } from "../API/useFetch";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function GetUser() {
  const ctx = React.useContext(AuthContext);
  const [data, callApi, isLoading] = useFetch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    if ("fetch" in data) {
      callApi("Users.json");
    }
  }, [data]);

  const userList = React.useMemo(() => {
    if (Object.keys(data).length > 0 && !("fetch" in data)) {
      const userData = [];
      for (const user in data) {
        for (const tel in data[user]) {
          if (search.length > 0) {
            if (tel.includes(search)) {
              userData.push({ ...data[user][tel], userId: user });
            }
          } else {
            userData.push({ ...data[user][tel], userId: user });
          }
        }
      }
      return userData;
    }
    return [];
  }, [data, search]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerList}>
          <FlatList
            data={userList}
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
              >
                <View
                  key={index}
                  style={{ width: "80%", justifyContent: "center" }}
                >
                  <Text style={styles.item}>
                    {item.Name}
                    {index}
                  </Text>
                </View>
                <View style={{ width: "10%" }}>
                  <Button
                    theme="icon"
                    onPress={() =>
                      navigation.navigate("AddUser", {
                        editUserDetails: item,
                      })
                    }
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
    width: "90%",
    height: 40,
    backgroundColor: "white",
    padding: 5,
  },
});
