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
import { SelectList } from "react-native-dropdown-select-list";
import AuthContext from "../context/AuthContext";
import { usePost } from "../API/usePost";
import { useNavigation } from "@react-navigation/native";

import * as SMS from "expo-sms";

const Role = [
  { key: "Admin", value: "Admin" },
  { key: "Landlord", value: "Landlord" },
  { key: "Tenant", value: "Tenant" },
];

const Block = [
  { key: "M81", value: "M81" },
  { key: "M82", value: "M83" },
  { key: "M83", value: "M83" },
];

const Status = [
  { key: false, value: "false" },
  { key: true, value: "true" },
];

export default function AddUser() {
  const ctx = React.useContext(AuthContext);
  const navigation = useNavigation(); 
  const [data, callApi, isLoading] = usePost();
  const [user, setUser] = React.useState({
    Name: "",
    Phone: 0,
    id: 0,
    password: "",
    role: "",
    status: false,
    block: "",
    hse: "",
    needPasswordChange: true,
  });

  const [activateBtn, setBtnActive] = useState();

  useEffect(() => {
    setBtnActive(
      user.Name.length > 0 && user.Phone.length > 9 && user.role.length > 0
    );
  }, [user]);

  const addUser = (e) => {
    setUser({ ...user, [e.type]: e.text });
  };
  const submitUser = () => {
    const newData = { [user.Phone]: { ...user, createdBy: ctx.user.id } };
   
    callApi("Users.json", newData);
  };

  const moveUser = ()=>{
    navigation.navigate('GetUser');
  }

  async function sendSMS(password) {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [user.Phone],
        `Hey ${user.Name} you have been registered on Icourt. Your password is ${password}`
      );
      if(result){
        navigation.navigate(`GetUser`);
      }
    } else {
      // misfortune... there's no SMS available on this device
      console.log("cant send");
    }
  }

  useEffect(() => {
    if ("error" in data) {
      console.log(data);
    } else if ("name" in data) {
      sendSMS(data.name);
    } else {
      //console.log(data);
    }
  }, [data]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={{ fontSize: 30, marginVertical: 8 }}>Add User</Text>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 5 }}>Full name</Text>

            <TextInput
              style={styles.input}
              placeholder="Glenn Tedd"
              onChangeText={(newText) =>
                addUser({ type: "Name", text: newText })
              }
              defaultValue={user.phoneNo}
              inputMode={"text"}
              keyboardType={"default"}
              maxLength={10}
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 5 }}>Phone number</Text>

            <TextInput
              style={styles.input}
              placeholder="0723241223"
              onChangeText={(newText) =>
                addUser({ type: "Phone", text: newText })
              }
              defaultValue={user.Phone}
              inputMode={"tel"}
              keyboardType={"phone-pad"}
              maxLength={10}
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 5 }}>Role</Text>
            <SelectList
              setSelected={(val) => addUser({ type: "block", text: val })}
              data={Block}
              placeholder={"Select Block"}
              save="value"
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 5 }}>House</Text>

            <TextInput
              style={styles.input}
              placeholder="hse"
              onChangeText={(newText) =>
                addUser({ type: "hse", text: newText })
              }
              defaultValue={user.hse}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 5 }}>Role</Text>
            <SelectList
              setSelected={(val) => addUser({ type: "role", text: val })}
              data={Role}
              placeholder={"Select Role"}
              save="value"
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 5 }}>Status</Text>
            <SelectList
              setSelected={(val) => addUser({ type: "status", text: val })}
              data={Status}
              style={styles.input}
              placeholder={"Status"}
              save="key"
            />
          </View>

          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 8 }}>
              <Button
                theme="primary"
                label="submit"
                onPress={submitUser}
                disbaled={activateBtn}
              />
            </View>
            <View style={{ width: "50%", padding: 8 }}>
              <Button theme="primary" label="check users" disbaled={true} onPress={moveUser}/>
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
    backgroundColor: "#fff",
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
