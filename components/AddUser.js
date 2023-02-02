import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Button from "./Button";
import { SelectList } from "react-native-dropdown-select-list";
import AuthContext from "../context/AuthContext";

export default function AddUser({ navigation }) {
  const ctx = React.useContext(AuthContext);
  const [selectedRole, setSelectedRole] = React.useState("");

  const [selectedStatus, setSelectedStatus] = React.useState("");

  const [credentials, setCredentials] = React.useState({
    phoneNo: 0,
    password: "",
  });

  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };
  const login = () => {
    callApi("Users.json");
  };

  const [user, setUser] = React.useState({
    Name: "",
    Phone: 0,
    id: 0,
    role: "",
    status: false,
    password: "",
  });

  const Role = [
    { key: "Admin", value: "Admin" },
    { key: "Landlord", value: "Landlord" },
    { key: "Tenant", value: "Tenant" },
  ];

  const Status = [
    { key: "false", value: "false" },
    { key: "true", value: "true" },
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginVertical: 8 }}>Add User</Text>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <Text style={{ marginBottom: 5 }}>Phone number</Text>

          <TextInput
            style={styles.input}
            placeholder="Glenn Tedd"
            placeholderTextColor={"black"}
            onChangeText={(newText) =>
              updateCredentials({ type: "Name", text: newText })
            }
            defaultValue={credentials.phoneNo}
            inputMode={"text"}
            keyboardType={"default"}
            maxLength={10}
          />
        </View>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <Text style={{ marginBottom: 5 }}>Role</Text>
          <SelectList
            setSelected={(val) => setSelectedRole(val)}
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
            setSelected={(val) => setSelectedStatus(val)}
            data={Status}
            style={styles.input}
            placeholder={"Status"}
            save="value"
          />
        </View>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
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

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
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

        <View style={styles.containerButtons}>
        <Button theme="primary" label="submit"  onPress={login} />
        <Button theme="primary" label="check users" onPress={login} />
        </View>

        
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtons:{
    flex: 1,
    flexDirection:"row",
    maxWidth:"100%",
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
