import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Month from "./components/months";
import Items from "./components/items";
import { Button, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export default function MakePayment() {
  const theme = useTheme();
  const [payment, setPayment] = useState({
    billItem: "",
    month: "",
    year: "",
  });

  return (
    <View style={styles.container}>
        
      <Items payment={setPayment} />

      <Month payment={setPayment} />

      <View style={styles.containerBtn}>
        <Button
          mode="elevated"
          buttonColor={theme.colors.primary}
          textColor={"white"}
          style={{
            borderRadius: 1,
          }}
        >
          Pay
        </Button>
      </View>
      
      <StatusBar style="light" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    paddingHorizontal: 20,
  },
  containerBtn: {
    marginVertical: 8,
    padding: 5,
    paddingVertical: 10,
    width: "100%",
  },
});
