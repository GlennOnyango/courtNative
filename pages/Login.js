import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFetch } from "../API/useFetch";

import AuthContext from "../context/AuthContext";

export default function Login({ navigation }) {
  const [credentials, setCredentials] = useState({ phoneNo: 0, password: "" });
  const [loggedData, setLoggedData] = useState({
    Name: "",
    Phone: 0,
    id: 0,
    role: "",
    status: false,
  });
  const [data, callApi] = useFetch();
  const ctx = useContext(AuthContext);

  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const login = () => {
    callApi("Users.json");
  };

  //Gets data when you visit accounts
  useEffect(() => {
    if (!("fetch" in data)) {
      for (const user in data) {
        const getNumber = "0" + data[user].phone;
        if (getNumber == credentials.phoneNo) {
          setLoggedData(data[user]);
          navigation.navigate(`Home`);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    ctx.login(loggedData);
  }, [loggedData]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <Image source={PlaceholderImage} style={styles.image} /> */}
        <MaterialCommunityIcons name="greenhouse" size={140} color="#ad1457" />

        <View style={styles.containerInput}>
          <Text style={{ fontSize: 30, marginVertical: 8 }}>
            Access your account
          </Text>
          <View style={styles.containerGroup}>
            <Text style={{ marginBottom: 5 }}>Phone number</Text>

            <TextInput
              style={styles.input}
              placeholder="07XXXXXXX"
              placeholderTextColor={"black"}
              onChangeText={(newText) =>
                updateCredentials({ type: "phoneNo", text: newText })
              }
              defaultValue={credentials.phoneNo}
              inputMode={"tel"}
              keyboardType={"phone-pad"}
              maxLength={10}
            />
          </View>

          <View style={styles.containerGroup}>
            <Text style={{ marginBottom: 5 }}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="*******"
              placeholderTextColor={"black"}
              onChangeText={(newText) =>
                updateCredentials({ type: "password", text: newText })
              }
              defaultValue={credentials.password}
              textContentType={"password"}
              secureTextEntry={true}
            />
          </View>

          <Button theme="primary" label="Login" onPress={login} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
  },
  image: {
    width: "50%",
    height: "30%",
    borderRadius: "50%",
    marginBottom: "5%",
  },
  containerInput: {
    height: "auto",
    alignItems: "center",
    justifyContent: "start",
    zIndex: 1,
    width: "100%",
    padding: 8,
  },
  containerGroup: {
    marginVertical: 8,
    paddingHorizontal: 5,
    width: "100%",
    paddingVertical: 8,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 3,
  },
});
