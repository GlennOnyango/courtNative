import React from "react";

import { Dimensions, StyleSheet } from "react-native";

import { Card, Text, useTheme } from "react-native-paper";


const { width, height } = Dimensions.get("window");

type Props = {
  firstText: string;
  secondText: string;
};

export default function CardHome({ firstText, secondText }: Props) {
  const theme = useTheme();
  return (
    <Card style={styles.cardStyle} mode="elevated" elevation={4}>
      <Card.Content style={styles.cardContent}>
        <Text
          variant="headlineMedium"
          style={{ textAlign: "center", color: theme.colors.primary  }}
        >
          {" "}
          {firstText}
        </Text>
        <Text
          variant="labelSmall"
          style={{ textAlign: "center", color: theme.colors.primary }}
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
    backgroundColor: "#ffffff",
    width: width / 3.5,
    borderRadius: 0,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});
