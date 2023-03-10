import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

//custom hooks
import { useGetUsers } from "../../customHooks/getUsers";

//special components
import SelectSpecial from "../selectSpecial";

//database
import { getDatabase, ref, set } from "firebase/database";
import { writeUserData } from "../../constants";
import { useCheckPrefect } from "../../customHooks/checkPrefect";

export default function AddCourt({ navigation, route }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [user, setuser] = React.useState("");
  const [response, setResponse] = useState("");
  const [responsePrefects, setResponsePrefects] = useState("");
  const [court, setCourt] = useState({
    Name: "",
    status: true,
  });

  const db = getDatabase();

  const [users] = useGetUsers();
  const [getPrefect, isPrefects] = useCheckPrefect();

  useEffect(() => {
    if (route.params) {
      const { item } = route.params;
      setCourt({
        Name: item.Name,
        status: item.status,
      });
      setuser(item.prefect);
    }
  }, [route.params]);

  useEffect(() => {
    if (response == "data created") createPrefect();
  }, [response]);

  useEffect(() => {
    if (responsePrefects == "data created") {
      setCourt({
        Name: "",
        status: true,
      });
      setuser("");

      navigation.navigate("Courts");
    }
  }, [responsePrefects]);

  useEffect(() => {
    getPrefect(user);
  }, [user]);

  useEffect(() => {
    if (isPrefects) setResponse("User is alread an admin on another court");
  }, [isPrefects]);

  const state = useMemo(() => {
    if (route.params) {
      return route.params.item.status;
    }
    return false;
  }, [route.params]);

  const usersData = useMemo(() => {
    const newData = users.map((e: any) => {
      if (e.status) {
        return {
          label: e.Name,
          value: e.Phone,
        };
      }
    });

    return newData.filter((x) => x !== undefined);
  }, [users]);

  const addCourt = (e) => {
    setCourt({ ...court, [e.type]: e.text });
  };

  const submitUser = () => {
    if (!isPrefects) {
      if (court.Name.length > 0 && user.length > 0) {
        const sendObj = {
          Name: court.Name,
          status: true,
          prefect: user,
        };
        writeUserData(db, set, ref, "court", user, sendObj, setResponse);
      } else {
        setResponse("Text field is empty");
      }
    }
  };
  const createPrefect = () => {
    const sendObj = {
      Name: court.Name,
      status: true,
    };
    writeUserData(db, set, ref, "prefects", user, sendObj, setResponsePrefects);
  };

  const clear = () => {
    setCourt({
      Name: "",
      status: true,
    });
    setuser("");
  };

  const changeUserStatus = () => {
    set(ref(db, `court/${court.Name}`), {
      Name: court.Name,
      status: !state,
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
          <Text
            variant="titleSmall"
            style={{
              marginVertical: 8,
              color: `${response == "data created" ? "green" : "red"}`,
            }}
          >
            {response}
          </Text>
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
              value={court.Name}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <SelectSpecial
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
              selectedData={user}
              setData={setuser}
              list={usersData}
              label="Select prefect"
            />
          </View>

          {route.params ? (
            <View style={styles.containerButtons}>
              <View style={{ width: "50%", padding: 4, height: 50 }}>
                <Button
                  mode="contained"
                  onPress={changeUserStatus}
                  buttonColor={state ? "red" : "green"}
                >
                  {state ? "Deactivate Court" : "Activate Court"}
                </Button>
              </View>

              <View style={{ width: "50%", padding: 4, height: 50 }}>
                <Button icon="security" mode="contained" onPress={clear}>
                  Control admins
                </Button>
              </View>
            </View>
          ) : null}
          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button icon="plus" mode="contained" onPress={submitUser}>
                {route.params ? "edit court" : "Add Court"}
              </Button>
            </View>

            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button icon="backspace" mode="contained" onPress={clear}>
                Clear
              </Button>
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
