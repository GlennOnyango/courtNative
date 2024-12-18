import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useContext, useMemo, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { usePost } from "../customHooks/usePost";
import * as Network from "expo-network";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

type userCredntial = {
  phoneNumber: string;
  password: string;
};

const { width, height } = Dimensions.get("window");


type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

export default function Login({ navigation }: Props) {
  const theme = useTheme();
  const { data, callApi, isLoading, postError } = usePost();
  const [isConnected, setConnected] = useState(false);
  const [credentials, setCredentials] = useState<userCredntial>({
    phoneNumber: "",
    password: "",
  });
  const [errorText, setError] = useState("");
  const ctx = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  useEffect(() => {
    console.log(data);
    if (data.token) {
      ctx.login(data);
    } else if (postError) {
      setError("Invalid email or passowrd.Try again later or get help");
    }
  }, [data, postError]);

  const login = () => {
    if (state) {

      ctx.login({token:"sdfsdfsdfsdfsdfsdf"});
      //callApi(credentials, "/api/v1/uaa/login", true);
    } else {
      setError("Empty input fields");
    }
  };

  const state = useMemo(() => {
    return (
      credentials.phoneNumber.length >= 10 && credentials.password.length > 0
    );
  }, [credentials]);

  Network.getNetworkStateAsync().then((e) => {
    if (e.isConnected) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  });

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
        <ScrollView style={styles.container}>
          <View style={styles.containerImage}>
            <Image
              source={require("../assets/vectors/security.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 0,
              }}
            />
          </View>

          <View style={styles.containerInput}>
            <Text
              style={{
                fontSize: 30,
                marginVertical: 2,
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

            <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
              {errorText}
            </Text>

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
                    disabled={!state || isLoading || !isConnected}
                  >
                    Sign In
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
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    Sign Up
                  </Button>
                </View>
              </View>
            </View>

            <Text variant="bodyLarge" style={{ marginTop: 8 }}>
              Unable to access our services ?{" "}
              {
                <Text
                  variant="bodyLarge"
                  style={{ color: theme.colors.secondary }}
                  onPress={() => login()}
                >
                  Get help
                </Text>
              }
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    height: height / 2,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 4,
  },
  containerInput: {
    alignItems: "center",
    zIndex: 1,
    width: width,
    height: height / 2,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  containerGroup: {
    marginVertical: 4,
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
