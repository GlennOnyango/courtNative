import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

import { Entypo } from "@expo/vector-icons";

type Props = {
  firstText: string;
  secondText: string;
  Icon: JSX.Element;
  press: string;
  navigation: any;
};

const { width, height } = Dimensions.get("window");
export default function CardOptions({
  firstText,
  secondText,
  Icon,
  press,
  navigation,
}: Props) {
  const { colors } = useTheme();
  const openNavigation = () => {
    navigation.navigate(press);
  };

  return (
    <Card
      style={{...styles.cardStyle, backgroundColor: colors.secondary, width: width / 2.5, height: height / 4.5,}}
      mode={"elevated"}
      elevation={5}
      onPress={openNavigation}
    >
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
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});
