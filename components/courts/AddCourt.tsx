import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, Button, useTheme, Text } from "react-native-paper";

//special components
import SelectSpecial from "../selectSpecial";

//database
import { usePost } from "../../customHooks/usePost";
import { StatusBar } from "expo-status-bar";

type changeAdminType = {
  Code: string;
  Reason: string;
  userId: string;
};

export default function AddCourt({ navigation, route }) {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [userSelected, setuser] = useState("");
  const [court, setCourt] = useState<changeAdminType>({
    Code: "",
    Reason: "",
    userId: "",
  });

  const { data, callApi, isLoading, postError, postsuccess } = usePost();

  useEffect(() => {
    if (route.params) {
      const { item } = route.params;
      setCourt({
        Code: item.Code,
        Reason: item.Reason,
        userId: item.userId,
      });
    }
  }, [route.params]);

  const addCourt = (e: { type: string; text: string }) => {
    setCourt({ ...court, [e.type]: e.text });
  };

  const submitUser = () => {
    if (court.Code !== "" || court.Reason !== "" || userSelected !== "") {
      callApi(court, "court/requestAdminChange");
    }
  };

  useEffect(() => {
    if (postsuccess) {
      navigation.navigate("Login");
    }
  }, [data, postError, postsuccess]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <View
              style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
            >
              <TextInput
                style={styles.input}
                label="Enter court code"
                mode="outlined"
                onChangeText={(newText) =>
                  addCourt({ type: "Code", text: newText })
                }
                value={court.Code}
                inputMode={"text"}
                keyboardType={"default"}
              />
            </View>

            <View
              style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
            >
              <TextInput
                style={styles.input}
                label="Reason for change"
                mode="outlined"
                onChangeText={(newText) =>
                  addCourt({ type: "Reason", text: newText })
                }
                value={court.Reason}
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
                selectedData={userSelected}
                setData={setuser}
                list={[]}
                label="Select new Admin"
              />
            </View>

            <View style={styles.containerButtons}>
              <Button
                mode="contained"
                buttonColor={theme.colors.primary}
                onPress={submitUser}
                style={{ borderRadius: 0 }}
              >
                {"Change admin"}
              </Button>
            </View>

            <View style={styles.containerButtons}>
              {postError && (
                <Text
                  variant="bodyLarge"
                  style={{ color: theme.colors.error, textAlign: "center" }}
                >
                  {
                    "Admin change request failed raise an issue to get help from our team."
                  }
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style="light" animated />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  containerForm: {
    width: "100%",
    height: "100%",
  },
  containerButtons: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 60,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
