import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import * as SMS from "expo-sms";
import { TextInput, Button, Text } from "react-native-paper";

import { getDatabase, ref, set } from "firebase/database";

export default function AddUser({ navigation, route }) {
  const [response, setResponse] = useState("");
  const [user, setUser] = React.useState({
    Name: "",
    Phone: 0,
    status: true,
  });

  const db = getDatabase();
  useEffect(() => {
    if (route.params) {
      const { item } = route.params;
      setUser(item);
    }
  }, [route.params]);

  const state = useMemo(() => {
    if (route.params) {
      return route.params.item.status;
    }
    return false;
  }, [route.params]);

  const addUser = (e) => {
    setUser({ ...user, [e.type]: e.text });
  };

  function writeUserData() {
    const pass = generatePassword(8);
    set(ref(db, `users/${user.Phone}`), {
      Name: user.Name,
      Phone: user.Phone,
      password: state ? user.password : pass,
      status: true,
    })
      .then(function () {
        setResponse("Admin added to the system");
        state ? sendSMS(undefined) : sendSMS(pass);
      })
      .catch(function (error) {
        setResponse("Admin not added to the system");
      });
  }

  const submitUser = () => {
    if (user.Name.length > 0) {
      writeUserData();
      setUser({
        Name: "",
        Phone: 0,
        status: true,
      });
    } else {
      setResponse("Text field is empty");
    }
  };

  async function sendSMS(password) {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      let message = "";
      if (password) {
        message = `Hey ${user.Name} you have been registered on Icourt. Your password is ${password}`;
      } else {
        message = `Hey ${user.Name} you details have been edited.If you get any issues contact any Adminstrator.`;
      }
      const { result } = await SMS.sendSMSAsync([user.Phone], message);
      if (result) {
        navigation.navigate("User");
      }
    } else {
      // misfortune... there's no SMS available on this device
    }
  }

  function generatePassword(length) {
    var charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    var password = "";
    for (var i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  // // Example usage: generate a 12-character password
  // var password = generatePassword(12);
  // console.log(password); // Output: something like "4H#i6^L|w~aB"

  const changeUserStatus = () => {
    set(ref(db, `users/${user.Phone}`), {
      Name: user.Name,
      Phone: user.Phone,
      password: state ? user.password : pass,
      status: !user.status,
    })
      .then(function () {
        setResponse("Admin status changed");
        navigation.navigate("User");
      })
      .catch(function (error) {
        setResponse("Admin not added to the system");
      });
  };

  const clear = () => {
    setUser({
      Name: "",
      Phone: 0,
      status: true,
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
              label="Full name"
              mode="outlined"
              onChangeText={(newText) =>
                addUser({ type: "Name", text: newText })
              }
              value={user.Name}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              label="Phone number"
              mode="outlined"
              onChangeText={(newText) =>
                addUser({ type: "Phone", text: newText })
              }
              value={user.Phone}
              inputMode={"tel"}
              keyboardType={"phone-pad"}
              maxLength={10}
            />
          </View>

          {route.params ? (
            <View style={styles.containerButtons}>
              <View style={{ width: "100%", padding: 4, height: 50 }}>
                <Button
                  mode="contained"
                  onPress={changeUserStatus}
                  buttonColor={state ? "red" : "green"}
                >
                  {state ? "Deactivate Admin" : "Activate Admin"}
                </Button>
              </View>
            </View>
          ) : null}

          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button icon="plus" mode="contained" onPress={submitUser}>
                Add Admin
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
    height: 50,
  },
});
