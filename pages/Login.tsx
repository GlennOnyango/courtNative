import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
} from "react-native";
import { useState, useContext, useMemo, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { usePost } from "../customHooks/usePost";
import * as SecureStore from "expo-secure-store";

type userCredntial = {
  phoneNumber: string;
  password: string;
};

export default function Login({ navigation }) {
  const theme = useTheme();
  const [data, callApi, isLoading] = usePost();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNumber: "",
    password: "",
  });
  const [errorText, setError] = useState("");
  const ctx = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    if (data.token) {
      save("token_exp", data);

      ctx.login(data);

      navigation.navigate(`Home`);
    } else if (Object.keys(data).length !== 0) {
      setError("Authentication error");
    }
  }, [data]);

  const login = () => {
    if (state) {
      callApi(credentials, "login");
    } else {
      setError("Empty input fields");
    }
  };

  const state = useMemo(() => {
    return (
      credentials.phoneNumber.length === 12 && credentials.password.length > 0
    );
  }, [credentials]);

  const clear = () => {
    setCredentials({ phoneNumber: "", password: "" });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={isLoading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image
              source={require("../assets/vectors/cloud.jpg")}
              style={{
                width: 250,
                height: 250,
                borderRadius: 150,
              }}
            />
          </View>

          <View style={styles.containerInput}>
            <Text
              style={{
                fontSize: 30,
                marginVertical: 2,
                fontFamily: "SpaceMono_700Bold",
              }}
            >
              Access your account
            </Text>

            <View style={styles.containerGroup}>
              <TextInput
                style={styles.input}
                label="Phone number"
                mode="outlined"
                onChangeText={(newText) =>
                  updateCredentials({ type: "phoneNumber", text: newText })
                }
                value={credentials.phoneNumber}
                inputMode={"tel"}
                keyboardType={"phone-pad"}
                maxLength={12}
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

            <Text variant="bodyMedium">{errorText}</Text>

            <View style={styles.containerGroup}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    width: "48%",
                  }}
                >
                  <Button
                    mode="elevated"
                    buttonColor={theme.colors.secondary}
                    textColor={"white"}
                    onPress={login}
                    style={{
                      borderRadius: 1,
                    }}
                    labelStyle={{
                      fontFamily: "SpaceMono_700Bold",
                    }}
                    disabled={!state}
                  >
                    Submit
                  </Button>
                </View>

                <View
                  style={{
                    width: "48%",
                  }}
                >
                  <Button
                    mode="elevated"
                    buttonColor={theme.colors.secondary}
                    textColor={"white"}
                    style={{
                      borderRadius: 1,
                    }}
                    onPress={clear}
                    labelStyle={{
                      fontFamily: "SpaceMono_700Bold",
                    }}
                  >
                    Clear
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  containerImage: {
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  containerInput: {
    alignItems: "center",
    zIndex: 1,
    width: "100%",
    height: "60%",
    paddingHorizontal: 12,
  },
  containerGroup: {
    marginVertical: 2,
    paddingHorizontal: 5,
    width: "100%",
    paddingVertical: 4,
  },
  input: {
    width: "100%",
    height: 50,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
