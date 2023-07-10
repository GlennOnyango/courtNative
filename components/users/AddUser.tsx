import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as SMS from "expo-sms";
import { TextInput, Button, Text, useTheme } from "react-native-paper";

type userCredntial = {
  Phone: string;
};

export default function AddUser({ navigation, route }) {
  const theme = useTheme();
  const [response, setResponse] = useState("");
  const [user, setUser] = React.useState<userCredntial>({
    Phone: "",
  });

  useEffect(() => {
    if (route.params) {
      const { item } = route.params;
      setUser(item);
    }
  }, [route.params]);

  const addUser = (e) => {
    setUser({ ...user, [e.type]: e.text });
  };

  const submitUser = () => {
    if (user.Phone.length > 9) {
      sendSMS();
      setUser({
        Phone: "",
      });
    } else {
      setResponse("Incorrect phone number");
    }
  };

  async function sendSMS() {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      let message = `Use this code x1hwq12 to register on Icourt.`;

      const { result } = await SMS.sendSMSAsync([user.Phone], message);
      if (result) {
        navigation.navigate("User");
      }
    } else {
      // misfortune... there's no SMS available on this device
    }
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 10,
              paddingVertical: 20,
              width: "96%",
              backgroundColor: "white",
            }}
          >
            <Text variant="titleLarge" style={{marginBottom:8}}>How it works</Text>
            <Text variant="bodyLarge">
              We use an internal court code and the phone number you provide to
              create a text message which you will send to the user to register.
              After their registration, they will be able to acess the court.
              You can change their role to admin after registration.
            </Text>
          </View>
          <View
            style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
          >
            <TextInput
              style={styles.input}
              label="Phone number"
              mode="outlined"
              onChangeText={(newText) =>
                addUser({ type: "Phone", text: newText })
              }
              value={user.Phone}
              inputMode={"tel"}
              keyboardType={"phone-pad"}
              maxLength={10}
            />
          </View>

          <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
            {response}
          </Text>
          <View style={styles.containerButtons}>
            <View style={{ width: "50%", padding: 4, height: 50 }}>
              <Button
                mode="elevated"
                buttonColor={theme.colors.secondary}
                textColor={"white"}
                onPress={submitUser}
                style={{
                  borderRadius: 1,
                }}
              >
                Add User
              </Button>
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
  },
});
