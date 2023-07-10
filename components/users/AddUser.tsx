import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import * as SMS from "expo-sms";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import SelectSpecial from "../selectSpecial";

type userCredntial = {
  Name: string;
  Phone: string;
  Nopassword: boolean;
};

export default function AddUser({ navigation, route }) {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [role, setRole] = React.useState("");

  const [response, setResponse] = useState("");
  const [user, setUser] = React.useState<userCredntial>({
    Name: "",
    Phone: "",
    Nopassword: true,
  });

  const userRole = [
    { label: "Admin", value: "Admin" },
    { label: "tenant", value: "tenant" },
  ];

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
    fetch("https://icourt-api.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, role: role }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.token) {
          sendSMS(json.password);
        } else {
          setResponse(json.message);
        }
      });
  }

  const submitUser = () => {
    if (user.Name.length > 0) {
      writeUserData();
      setUser({
        Name: "",
        Phone: "",
        Nopassword: true,
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

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <SelectSpecial
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
              selectedData={role}
              setData={setRole}
              list={userRole}
              label="Select user role"
            />
          </View>

          {/* {route.params ? (
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
          ) : null} */}

          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button
                mode="elevated"
                buttonColor={theme.colors.secondary}
                textColor={"white"}
                onPress={submitUser}
                style={{
                  borderRadius: 1,
                }}
              >
                Add User
              </Button>
            </View>
          </View>

          <Text variant="titleSmall">{response}</Text>

          <Text>How it works</Text>
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
