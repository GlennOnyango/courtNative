import { StyleSheet, View, Dimensions } from "react-native";
import { useState, useMemo, useEffect } from "react";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { usePost } from "../../customHooks/usePost";
import * as Network from "expo-network";
import { StatusBar } from "expo-status-bar";
import SelectSpecial from "@components/selectSpecial";

type accountRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  navigation: any;
};

const { width, height } = Dimensions.get("window");
export default function CreateAccount({ navigation }: Props) {
  const theme = useTheme();
  const { callApi, isLoading, postError, postsuccess } = usePost();
  const [showDropDown, setShowDropDown] = useState(false);
  const [userSelected, setuser] = useState("");

  const [isConnected, setConnected] = useState(false);
  const [credentials, setCredentials] = useState<accountRegister>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userType: "",
    password: "",
    confirmPassword: "",
  });
  const [errorText, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);

  const updateCredentials = (e: { type: string; text: string }) => {
    setCredentials({ ...credentials, [e.type]: e.text });
  };

  useEffect(() => {
    if (postsuccess) {
      navigation.navigate("Login");
    } else if (postError) {
      setError("There is an error.Try again later or get help.");
    }
  }, [postError, postsuccess]);

  const login = () => {
    if (state) {
      callApi(credentials, "/register-court", true);
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
            fontSize: 30,
            marginBottom: 2,
          }}
        >
          Create your court
        </Text>

        <View style={styles.containerGroup}>
          <TextInput
            style={styles.input}
            label="First Name"
            mode="outlined"
            onChangeText={(newText) =>
              updateCredentials({ type: "firstName", text: newText })
            }
            value={credentials.firstName}
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>
        <View style={styles.containerGroup}>
          <TextInput
            style={styles.input}
            label="Last Name"
            mode="outlined"
            onChangeText={(newText) =>
              updateCredentials({ type: "lastName", text: newText })
            }
            value={credentials.lastName}
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
            label="Email"
            mode="outlined"
            onChangeText={(newText) =>
              updateCredentials({ type: "email", text: newText })
            }
            value={credentials.email}
            inputMode={"email"}
          />
        </View>

        <View style={styles.containerGroup}>
          <SelectSpecial
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
            selectedData={userSelected}
            setData={setuser}
            list={[
              {
                label: "tenant",
                value: "tenant",
              },
              {
                label: "admin",
                value: "admin",
              },
            ]}
            label="Select new Admin"
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
          <TextInput
            style={styles.input}
            label="Confirm Password"
            mode="outlined"
            onChangeText={(newText) =>
              updateCredentials({ type: "confirmPassword", text: newText })
            }
            value={credentials.confirmPassword}
            textContentType={"password"}
            secureTextEntry={confirmPasswordShow}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={(e) => setConfirmPasswordShow(!confirmPasswordShow)}
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
                onPress={login}
                style={{
                  borderRadius: 1,
                }}
                disabled={!state || isLoading || !isConnected}
              >
                Create Court
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

      <StatusBar style="light" animated />
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
