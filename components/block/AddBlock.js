import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import Button from "../Button";
import AuthContext from "../../context/AuthContext";
import { usePost } from "../../API/usePost";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddBlock() {
  const ctx = React.useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [data, callApi, isLoading] = usePost();

  const [block, setBlock] = React.useState({
    blockName: "",
    Phone: 0,
  });

  const [activateBtn, setBtnActive] = React.useState();

  React.useEffect(() => {
    setBtnActive(block.blockName.length > 0);
  }, [block]);

  const addBlock = (e) => {
    setBlock({ ...block, [e.type]: e.text });
  };

  const submitUser = () => {
    const newData = { ...block, createdBy: ctx.user.id };

    callApi("Blocks.json", newData);
  };

  React.useEffect(() => {
    if ("error" in data) {
      console.log(data);
    } else if ("name" in data) {
      console.log(data);
    }
  }, [data]);

  const moveUser = () => {
    navigation.navigate("GetUser");
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={{ fontSize: 30, marginVertical: 8 }}>Add Block</Text>

          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 5 }}>Block name</Text>

            <TextInput
              style={styles.input}
              placeholder="M01"
              onChangeText={(newText) =>
                addBlock({ type: "blockName", text: newText })
              }
              defaultValue={block.blockName}
              inputMode={"text"}
              keyboardType={"default"}
            />
          </View>

          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 8, height: 70 }}>
              <Button
                theme="primary"
                label="submit"
                onPress={submitUser}
                disbaled={activateBtn}
              />
            </View>
            <View style={{ width: "50%", padding: 8, height: 70 }}>
              <Button
                theme="primary"
                label="check Blocks"
                disbaled={true}
                onPress={moveUser}
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
