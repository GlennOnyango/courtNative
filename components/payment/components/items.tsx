import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import SelectSpecial from "../../selectSpecial";
import { Text } from "react-native-paper";

type Props = {
  payment: React.Dispatch<
    React.SetStateAction<{
      billItem: string;
      month: string;
    }>
  >;
};

export default function Items({ payment }: Props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [billSelected, setBill] = useState("allcode");

  const billItems = [
    { label: "Pay all bills", value: "allcode" },
    { label: "Water Bill", value: "2wbill" },
    { label: "Electricity Bill", value: "ebill" },
    { label: "Rent", value: "rbill" },
  ];

  useEffect(() => {
    payment((prev) => ({ ...prev, billItem: billSelected }));
  }, [billSelected]);

  //get bills from api is done

  return (
    <View style={styles.container}>
      <Text>Select bill *</Text>

      <SelectSpecial
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
        selectedData={billSelected}
        setData={setBill}
        list={billItems}
        label=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 5,
    paddingVertical: 10,
    width: "100%",
  },
});
