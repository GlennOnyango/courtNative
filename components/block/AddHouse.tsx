import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { TextInput, Text, Button, useTheme } from "react-native-paper";
import AuthContext from "../../context/AuthContext";
import { usePost } from "../../customHooks/usePost";

export default function AddHouse() {
  const ctx = useContext(AuthContext);
  const theme = useTheme();
  const [response, setResponse] = useState({
    message: "",
    color: theme.colors.error,
  });
  const { data, callApi, postError, postsuccess } = usePost();

  const [house, setHouse] = React.useState({
    houseName: "",
    houseOwner: "",
    courtId: ctx.court.courtId,
  });

  const addBlock = (e) => {
    setHouse({ ...house, [e.type]: e.text });
  };

  const submitUser = () => {
    if (house.houseName.length > 0) {
      callApi(house, "house");
      setResponse({
        message: "House added successfully",
        color: theme.colors.primary,
      });
      setHouse({
        houseName: "",
        houseOwner: "",
        courtId: ctx.court.courtId,
      });
    } else {
      setResponse({
        message: "Please fill House Name",
        color: theme.colors.error,
      });
    }
  };

  useEffect(() => {
    if (postError) {
      setResponse({
        message: "Something went wrong",
        color: theme.colors.error,
      });
    } else if (postsuccess) {
      setResponse({
        message: "House added successfully",
        color: theme.colors.primary,
      });
    }
  }, [postsuccess, postError]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="Court Name *"
            mode="outlined"
            disabled={true}
            value={ctx.court.Name}
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="House Name *"
            mode="outlined"
            onChangeText={(newText) =>
              addBlock({ type: "houseName", text: newText })
            }
            value={house.houseName}
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="House proprietor"
            mode="outlined"
            onChangeText={(newText) =>
              addBlock({ type: "houseOwner", text: newText })
            }
            value={house.houseOwner}
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>

        <View style={styles.containerButtons}>
          <View style={{ width: "50%", height: 50 }}>
            <Button
              mode="contained"
              onPress={submitUser}
              style={{ borderRadius: 0 }}
            >
              Add House
            </Button>
          </View>
        </View>
        <Text
          variant="bodyLarge"
          style={{ color: response.color, textAlign: "center" }}
        >
          {response.message}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  containerButtons: {
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
