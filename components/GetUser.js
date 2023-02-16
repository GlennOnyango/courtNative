import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import { useFetch } from "../API/useFetch";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebaseConfig";

export default function GetUser() {
  const ctx = React.useContext(AuthContext);
  const [data, callApi, isLoading] = useFetch();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const database = getDatabase(app);

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
    const starCountRef = ref(database, `users/`);

    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
      } else {
        setError(true);
        console.log("No data available");
      }
      //updateStarCount(postElement, data);
    });
  }, []);

  const userList = useMemo(() => {
    const starCountRef = ref(database, `users/`);

    const userData = [];

    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        for (const user in data) {
          if (search.length > 0) {
            if (user.includes(search)) {
              userData.push(data[user]);
            }
          } else {
            userData.push(data[user]);
          }
        }
      } else {
        console.log("No data available");
      }
    });

    return userData;
  }, [search]);

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
