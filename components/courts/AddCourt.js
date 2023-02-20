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

import { Text } from 'react-native-paper';
import { getDatabase, ref, set } from "firebase/database";

export default function AddCourt() {
  const [user, setUser] = React.useState({
    Name: "",
    status: true,
  });
  const [response,setResponse] = useState("");

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
        setResponse("Court added to the system")
      })
      .catch(function (error) {
        setResponse("Court not added to the system")
      });
  }

  const submitUser = () => {
    
    if(user.Name.length > 0){
      writeUserData();
      setUser({
        Name: "",
        status: true,
      });
    }else{
      setResponse("Text field is empty");
    }
    
  };

  const clear = () => {
    setUser({
      Name: "",
      status: true,
    });
  };

  // useEffect(() => {
  //   if (Object.keys(item.item).length > 0) {
  //     setUser(item.item);
  //   }
  // }, [item]);

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

          <Text variant="titleSmall" marginVertical={4}>{response}</Text>
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
