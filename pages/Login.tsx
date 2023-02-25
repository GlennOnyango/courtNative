import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebaseConfig";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput, Button, Text } from "react-native-paper";

type userCredntial = {
  phoneNo: number;
  password: string;
};

export default function Login({ navigation }) {
  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNo: 0,
    password: "",
  });
  const [error, setError] = useState("");
  const ctx = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);
  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  const database = getDatabase(app);

  const login = () => {
    if (state) {
      const starCountRef = ref(database, `users/${credentials.phoneNo}`);

      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.password == credentials.password && data.status) {
            ctx.login(data);
            navigation.navigate(`Home`);
          } else {
            setError("Password Wrong");
          }
        } else {
          setError("No data available");
        }
        //updateStarCount(postElement, data);
      });
    } else {
      setError("Empty input fields");
    }
  };

  const state = useMemo(() => {
    return (
      credentials.phoneNo.toString().length > 0 &&
      credentials.password.length > 0
    );
  }, [credentials]);

  const clear = () => {
    setCredentials({ phoneNo: 0, password: "" });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <FontAwesome5 name="house-user" size={86} color="black" />

        <View style={styles.containerInput}>
          <Text style={{ fontSize: 30, marginVertical: 8 }}>
            Access your account
          </Text>

          <Text variant="bodyMedium">{error}</Text>

          <View style={styles.containerGroup}>
            <TextInput
              style={styles.input}
              label="Phone number"
              mode="outlined"
              onChangeText={(newText) =>
                updateCredentials({ type: "phoneNo", text: newText })
              }
              value={credentials.phoneNo}
              inputMode={"tel"}
              keyboardType={"phone-pad"}
              maxLength={10}
            />
          </View>

          <View style={styles.containerGroup}>
            <TextInput
              style={styles.input}
              label="Password"
              mode="outlined"
              onChangeText={(newText) =>
                updateCredentials({ type: "password", text: newText })
              }
              value={credentials.password}
              textContentType={"password"}
              secureTextEntry={showPassword}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={(e) => setShowPassword(!showPassword)}
                  forceTextInputFocus={false}
                />
              }
            />
          </View>

          <View style={styles.containerGroup}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button
                icon="login"
                mode="elevated"
                buttonColor={state ? "black" : "grey"}
                textColor={"white"}
                onPress={login}
                style={{ width: "45%" }}
                disbaled={state}
              >
                Submit
              </Button>

              <Button
                icon="backspace"
                mode="elevated"
                buttonColor="black"
                textColor={"white"}
                style={{ width: "45%" }}
                onPress={clear}
              >
                Clear
              </Button>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height:"100%"
  },
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
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
    height: 60,
  },
});
