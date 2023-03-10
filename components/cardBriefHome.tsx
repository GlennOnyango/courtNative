import React from "react";

import { StyleSheet } from "react-native";

import { Card, Text } from "react-native-paper";

type Props = {
  firstText: string;
  secondText: string;
};

export default function CardHome({ firstText, secondText }: Props) {
  return (
    <Card style={styles.cardStyle} mode="elevated" elevation={4}>
      <Card.Content style={styles.cardContent}>
        <Text
          variant="headlineMedium"
          style={{ textAlign: "center", color: "black" }}
        >
          {" "}
          {firstText}
        </Text>
        <Text
          variant="labelSmall"
          style={{ textAlign: "center", color: "black" }}
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
    width: "30%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12,
  },
});
