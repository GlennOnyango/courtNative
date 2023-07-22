import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Text, TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  payment: React.Dispatch<
    React.SetStateAction<{
      billItem: string;
      month: string;
    }>
  >;
};

export default function Month({ payment }: Props) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [date, setDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    payment((prev) => ({
      ...prev,
      month: monthNames[date.getMonth()],
      year: date.getFullYear(),
    }));
  }, [date]);

  return (
    <View style={styles.container}>
      <Text>Select Month you are paying for</Text>

      <TextInput
        style={styles.input}
        label=""
        mode="outlined"
        value={`${monthNames[date.getMonth()]} - ${date.getFullYear()}`}
        showSoftInputOnFocus={false}
        keyboardType={"numbers-and-punctuation"}
        onPressIn={showDatePicker}
      />
      <DateTimePickerModal
        date={date}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 5,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 60,
  },
});
