import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { TextInput, Button, useTheme, Text } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//custom hooks

//special components

//database
import { usePost } from "../../customHooks/usePost";
import AuthContext from "../../context/AuthContext";

type Bill = {
  courtCode: string;
  billName: string;
  expenditureType: "recurrent" | "one-time";
  amount: string;
  startDate: Date;
  paymentDeadline: number;
};

export default function CreateBill({ navigation, route }) {
  const theme = useTheme();
  const { data, callApi, isLoading, postError, postsuccess } = usePost();
  const ctx = useContext(AuthContext);
  const [bill, setBill] = useState<Bill>({
    courtCode: ctx.court.Code,
    billName: "",
    expenditureType: "recurrent",
    amount: "",
    startDate: new Date(),
    paymentDeadline: 5,
  });

  const addBill = (e: { type: string; text: string }) => {
    setBill((prev) => ({ ...prev, [e.type]: e.text }));
  };

  const submitUser = () => {};

  useEffect(() => {
    if (postsuccess) {
      navigation.navigate("Login");
    }
  }, [data, postError, postsuccess]);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    addBill({ type: "startDate", text: date });
    hideDatePicker();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="Court Name *"
            mode="outlined"
            value={ctx.court.Name}
            inputMode={"text"}
            keyboardType={"default"}
            disabled={true}
          />
        </View>
        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="Bill Name *"
            mode="outlined"
            value={bill.billName}
            onChangeText={(newText) =>
              addBill({ type: "billName", text: newText })
            }
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>
        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="Expenditure Type *"
            mode="outlined"
            value={bill.expenditureType}
            onChangeText={(newText) =>
              addBill({ type: "billName", text: newText })
            }
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="Amount *"
            mode="outlined"
            onChangeText={(newText) =>
              addBill({ type: "amount", text: newText })
            }
            value={bill.amount}
            inputMode={"text"}
            keyboardType={"default"}
          />
        </View>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="Start date *"
            mode="outlined"
            value={`${bill.startDate.getDate()}-${bill.startDate.getMonth()}-${bill.startDate.getFullYear()}`}
            showSoftInputOnFocus={false}
            keyboardType={"numbers-and-punctuation"}
            onPressIn={showDatePicker}
          />
          <DateTimePickerModal
            date={bill.startDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View
          style={{ marginVertical: 8, paddingHorizontal: 5, width: "100%" }}
        >
          <TextInput
            style={styles.input}
            label="Payment deadline *"
            mode="outlined"
            value={String(bill.paymentDeadline)}
            keyboardType={"numeric"}
            onChangeText={(newText) => {
              const num = Number(newText);
              if (!isNaN(num) && num !== 0 && num < 31) {
                addBill({ type: "paymentDeadline", text: newText });
              }
            }}
          />
        </View>

        <View style={styles.containerButtons}>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            onPress={submitUser}
            style={{ borderRadius: 0 }}
          >
            {"Create Bill"}
          </Button>
        </View>

        <View style={styles.containerButtons}>
          {postError && (
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.error, textAlign: "center" }}
            >
              {
                "Admin change request failed raise an issue to get help from our team."
              }
            </Text>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButtons: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 60,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
