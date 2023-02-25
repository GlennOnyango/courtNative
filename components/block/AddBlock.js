import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useMemo, useState } from "react";

import AuthContext from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Text, Button } from "react-native-paper";
import { useGetCourts } from "../../customHooks/getCourts";
import DropDown from "react-native-paper-dropdown";
import { getDatabase, ref, set } from "firebase/database";

export default function AddBlock() {
  const ctx = React.useContext(AuthContext);
  const navigation = useNavigation();

  const db = getDatabase();
  const [response, setResponse] = useState("");
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [court, setCourt] = React.useState("");
  const [courts] = useGetCourts();

  const [block, setBlock] = React.useState({
    blockName: "",
    court: "",
  });

  const addBlock = (e) => {
    setBlock({ ...block, [e.type]: e.text });
  };

  const submitUser = () => {
    if (block.blockName.length > 0 && court.length > 0) {
      writeUserData();
      setBlock({
        blockName: "",
        court: "",
      });
      setCourt("");
    } else {
      setResponse("Text field is empty");
    }
  };

  const courtsData = useMemo(() => {
    const newData = courts.map((e) => {
      if (e.status) {
        return {
          label: e.Name,
          value: e.Name,
        };
      }
    });

    return newData.filter((x) => x !== undefined);
  }, [courts]);

  function writeUserData() {
    set(ref(db, `blocks/${block.blockName}`), {
      Name: block.blockName,
      courtName: court,
    })
      .then(function () {
        setResponse("Block added to the system");
      })
      .catch(function (error) {
        setResponse("Block not added to the system");
      });
  }

  const clear = () => {
    console.log(court);
    setBlock({
      blockName: "",
      court: "",
    });
    setCourt("");
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <DropDown
              label={"Select court"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={court}
              setValue={setCourt}
              list={courtsData}
            />
          </View>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              label="Block Name"
              mode="outlined"
              onChangeText={(newText) =>
                addBlock({ type: "blockName", text: newText })
              }
              value={block.blockName}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button icon="plus" mode="contained" onPress={submitUser}>
                Add Block
              </Button>
            </View>

            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button icon="backspace" mode="contained" onPress={clear}>
                Clear
              </Button>
            </View>
          </View>

          <Text variant="titleSmall" marginVertical={4}>
            {response}
          </Text>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height:"100%",
    justifyContent: "center",
    alignItems: "center",
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
