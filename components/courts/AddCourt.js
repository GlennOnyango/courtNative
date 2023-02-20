import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../Button";

import { getDatabase, ref, set } from "firebase/database";

export default function AddCourt(item) {

  const [user, setUser] = React.useState({
    Name: "",
    status: true,
  });

  const [activateBtn, setBtnActive] = useState();

  useEffect(() => {
    setBtnActive(user.Name.length > 0);
  }, [user]);

  const addCourt = (e) => {
    setUser({ ...user, [e.type]: e.text });
  };

  function writeUserData() {
    const db = getDatabase();
    set(ref(db, `court/${user.Name}`), {
      Name: user.Name,
      status: true,
    })
      .then(function () {
        console.log("Synchronization succeeded");
      })
      .catch(function (error) {
        console.log("Synchronization failed");
      });
  }

  const submitUser = () => {
    writeUserData();
    setUser({
      Name: "",
      status: true,
    });
  };

  const clear = () => {
    setUser({
      Name: "",
      status: true,
    });
  };

  useEffect(() => {
    if (Object.keys(item.item).length > 0) {
      setUser(item.item);
    }
  }, [item]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          
          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter court name"
              onChangeText={(newText) =>
                addCourt({ type: "Name", text: newText })
              }
              defaultValue={user.Name}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button
                theme="primary"
                label="Add Court"
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
