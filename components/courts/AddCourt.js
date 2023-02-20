import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
//import Button from "../Button";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

import { Text } from "react-native-paper";
import { getDatabase, ref, set } from "firebase/database";

export default function AddCourt({ navigation, route }) {
  const { item } = route.params;
  const [user, setUser] = React.useState({
    Name: "",
    status: true,
  });
  const db = getDatabase();

  const [response, setResponse] = useState("");

  const addCourt = (e) => {
    setUser({ ...user, [e.type]: e.text });
  };

  useEffect(() => {
    if (route.params) setUser(item);
  }, [route.params]);

  function writeUserData() {
    set(ref(db, `court/${user.Name}`), {
      Name: user.Name,
      status: true,
    })
      .then(function () {
        setResponse("Court added to the system");
      })
      .catch(function (error) {
        setResponse("Court not added to the system");
      });
  }

  const submitUser = () => {
    if (user.Name.length > 0) {
      writeUserData();
      setUser({
        Name: "",
        status: true,
      });
    } else {
      setResponse("Text field is empty");
    }
  };

  const clear = () => {
    setUser({
      Name: "",
      status: true,
    });
  };

  const changeUserStatus = () => {
    set(ref(db, `court/${user.Name}`), {
      Name: user.Name,
      status: !route.params.item.status,
    })
      .then(function () {
        setResponse("Court status changed");
        navigation.navigate("Courts");
      })
      .catch(function (error) {
        setResponse("Court not added to the system");
      });
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              label="Enter court name"
              mode="outlined"
              onChangeText={(newText) =>
                addCourt({ type: "Name", text: newText })
              }
              value={user.Name}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          {route.params ? (
            <View style={styles.containerButtons}>
              <View style={{ width: "100%", padding: 4, height: 50 }}>
                <Button mode="contained" onPress={changeUserStatus}>
                  {route.params.item.status
                    ? "Deactivate Court"
                    : "Activate Court"}
                </Button>
              </View>
            </View>
          ) : null}
          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button icon="plus" mode="contained" onPress={submitUser}>
                Add Court
              </Button>
            </View>

            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button icon="backspace" mode="contained" onPress={clear}>
                Clear
              </Button>
            </View>
          </View>

          <Text variant="titleSmall" marginVertical={4}>
            {response}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 60,
  },
});
