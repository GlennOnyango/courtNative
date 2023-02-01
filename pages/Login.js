
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFetch } from "../API/useFetch";

export default function Login({ navigation }) {
  const [credentials, setCredentials] = useState({ phoneNo: 0, password: "" });
    const [loggedData,setLoggedData] = useState({"Name": "", "Phone": 0, "id": 0, "role": "", "status": false});
  const [data, callApi] = useFetch();

  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const login = () => {
    callApi("Users.json");
  };

  //Gets data when you visit accounts
  useEffect(() => {
    if (!("fetch" in data)) {
      for(const user in data){
        const getNumber  = "0"+data[user].phone;
        if(getNumber == credentials.phoneNo){
            setLoggedData(data[user]);
            console.log(loggedData);
            navigation.navigate(`${data[user].role}`)
        }
      }
    }
  }, [data]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <Image source={PlaceholderImage} style={styles.image} /> */}
        <MaterialCommunityIcons name="greenhouse" size={140} color="#ad1457" />
        
        <View style={styles.containerInput}>
          <Text style={{ fontSize: 30, marginVertical: 8 }}>
            Access your account
          </Text>
          <View style={{ marginVertical: 8, paddingHorizontal: 5 }}>
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

          <View style={{ marginVertical: 8, paddingHorizontal: 5 }}>
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
    backgroundColor: "#fff",
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
    padding: 5,
  },
  input: {
    width: 350,
    height: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius: 3,
  },
  buttonApp: {
    backgroundColor: "blue",
  },
});
