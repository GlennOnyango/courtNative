import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { Entypo } from "@expo/vector-icons";


type Props = {
  firstText: string;
  secondText: string;
  Icon: JSX.Element;
  press:string;
  navigation:any;
};

export default function CardOptions({ firstText, secondText, Icon,press,navigation }: Props) {
    return (
    <Card style={styles.cardStyle} mode={"elevated"} elevation={5}  onPress={()=>navigation.navigate(press)}>
      <Card.Content style={styles.cardContent}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {Icon}
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>

        <Text
          variant="labelLarge"
          style={{ textAlign: "justify", color: "white", marginVertical: 4 }}
        >
          {" "}
          {firstText}
        </Text>
        <Text
          variant="labelSmall"
          style={{ textAlign: "justify", color: "white" }}
        >
          {" "}
          {secondText}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#000000",
    width: "45%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});
