import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Button from "./Button";
//import { useNavigation, useRoute } from "@react-navigation/native";
import * as SMS from "expo-sms";

import { getDatabase, ref, set } from "firebase/database";

export default function AddUser(editItem, reset) {
  // const route = useRoute();
  const [user, setUser] = React.useState({
    Name: "",
    Phone: 0,
    status: true,
  });

  const [activateBtn, setBtnActive] = useState();

  useEffect(() => {
    setBtnActive(user.Name.length > 0 && user.Phone.length > 9);
  }, [user]);

  const addUser = (e) => {
    setUser({ ...user, [e.type]: e.text });
  };

  function writeUserData(edit) {
    const db = getDatabase();
    const pass = generatePassword(8);
    set(ref(db, `users/${user.Phone}`), {
      Name: user.Name,
      Phone: user.Phone,
      password: edit ? user.password : pass,
      status: true,
    })
      .then(function () {
        console.log("Synchronization succeeded");
        edit ? sendSMS(undefined) : sendSMS(pass);
      })
      .catch(function (error) {
        console.log("Synchronization failed");
      });
  }

  const submitUser = () => {
    writeUserData(editItem.editItem);
    setUser({
      Name: "",
      Phone: 0,
      status: true,
    });
  };

  useEffect(() => {
    if (Object.keys(editItem.editItem).length > 0) {
      setUser(editItem.editItem);
    }
  }, [editItem]);

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
        reset();
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
              placeholder="Full name"
              onChangeText={(newText) =>
                addUser({ type: "Name", text: newText })
              }
              defaultValue={user.Name}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              onChangeText={(newText) =>
                addUser({ type: "Phone", text: newText })
              }
              defaultValue={user.Phone}
              inputMode={"tel"}
              keyboardType={"phone-pad"}
              maxLength={10}
            />
          </View>

          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button
                theme="primary"
                label="Add User"
                onPress={submitUser}
                disbaled={activateBtn}
              />
            </View>

            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button
                theme="primary"
                label="Clear"
                onPress={clear}
                disbaled={true}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
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
    padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 3,
  },
});
