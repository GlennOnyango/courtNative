import { StyleSheet, View, Dimensions } from "react-native";
import { useState, useMemo, useEffect } from "react";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { usePost } from "../../customHooks/usePost";
import * as Network from "expo-network";

type userCredntial = {
  courtCode: string;
  username: string;
  phoneNumber: string;
  password: string;
};

const { width } = Dimensions.get("window");
export default function CreateTenant({ navigation }) {
  const theme = useTheme();
  const { callApi, isLoading, postError, postsuccess } = usePost();
  const [isConnected, setConnected] = useState(false);
  const [credentials, setCredentials] = useState<userCredntial>({
    courtCode: "",
    username: "",
    phoneNumber: "",
    password: "",
  });
  const [errorText, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };


  useEffect(() => {
    if (postsuccess) {
        navigation.navigate("Login");
    } else if (postError) {
      setError("There is an error.Try again later or get help.");
    }
  }, [postError, postsuccess]);

  const register = () => {
    if (state) {
      callApi(credentials, "/register-tenant", true);
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
    <>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={isLoading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.containerInput}>
        <Text
          style={{
            fontSize: 14,
            marginVertical: 2,
            fontWeight: "bold",
          }}
        >
          Use the court code provided by your admin to join the court.
        </Text>

        <View style={styles.containerGroup}>
          <TextInput
            style={styles.input}
            label="Court Code"
            mode="outlined"
            onChangeText={(newText) =>
              updateCredentials({ type: "courtCode", text: newText })
            }
            value={credentials.phoneNumber}
            inputMode={"text"}
            keyboardType={"default"}
            maxLength={5}
          />
        </View>

        <View style={styles.containerGroup}>
          <TextInput
            style={styles.input}
            label="User Name"
            mode="outlined"
            onChangeText={(newText) =>
              updateCredentials({ type: "userName", text: newText })
            }
            value={credentials.phoneNumber}
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>

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
                buttonColor={theme.colors.primary}
                textColor={"white"}
                onPress={register}
                style={{
                  borderRadius: 1,
                }}
                disabled={!state || isLoading || !isConnected}
              >
                Register
              </Button>
            </View>

            <View
              style={{
                width: "48%",
              }}
            >
              <Button
                mode="elevated"
                buttonColor={theme.colors.primary}
                textColor={"white"}
                style={{
                  borderRadius: 1,
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Button>
            </View>
          </View>
        </View>

        <Text variant="bodyLarge" style={{ marginTop: 8 }}>
          Unable to access our services ?{" "}
          {
            <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
              Get help
            </Text>
          }
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 1,
    width: width,
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
