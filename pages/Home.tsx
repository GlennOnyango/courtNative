import React from "react";

import { StyleSheet, FlatList, View, Image } from "react-native";

import CardButton from "../components/Card";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { Card, Text, Button } from "react-native-paper";
import CardHome from "../components/cardBriefHome";

const PlaceholderImage = require("../assets/images/admin1.jpg");

export default function Admin({ navigation }) {
  const ctx = React.useContext(AuthContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: `Admin`,
      
      
    });
    
  }, [ctx.user]);

  const modules = [
    {
      key: "Users",
      press: () => navigation.navigate(`User`),
      child: <FontAwesome name="users" size={32} color="#ad1457" />,
    },
    {
      key: "Bills",
      press: () => alert("bills"),
      child: (
        <FontAwesome5 name="money-bill-wave-alt" size={32} color="#ad1457" />
      ),
    },
    {
      key: "Courts",
      press: () => navigation.navigate(`Courts`),
      child: <Fontisto name="treehouse" size={32} color="#ad1457" />,
    },
    {
      key: "Residents",
      press: () => alert("tenant"),
      child: (
        <MaterialIcons name="person-pin-circle" size={32} color="#ad1457" />
      ),
    },
    {
      key: "Block",
      press: () => navigation.navigate(`Add Block`),
      child: <FontAwesome5 name="house-user" size={32} color="#ad1457" />,
    },
    {
      key: "Tenant",
      press: () => alert("tenant"),
      child: (
        <MaterialCommunityIcons name="finance" size={32} color="#ad1457" />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>

      <Card style={styles.cardStyle}>
        <Card.Title
          title="Manage Your Residents"
          subtitle={`welecome ${ctx.user.Name}`}
          subtitleStyle={{ textAlign: "center" }}
          titleStyle={styles.cardText}
          
        />
        <Card.Content style={styles.cardContent}>
          <CardHome firstText="100" secondText="Residents" />

          <CardHome firstText="110" secondText="Homes" />

          <CardHome firstText="20000" secondText="Collections" />
        </Card.Content>
      </Card>

      <View style={styles.cardsContainer}>
        <Text variant="titleLarge" style={{ textAlign: "left" }}>
          Title Medium
        </Text>
        <FlatList
          data={modules}
          key={3}
          numColumns={3}
          renderItem={({ item }) => (
            <CardButton
              onPress={item.press}
              name={item.key}
              childern={item.child}
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" buttonColor="black">
          I have a complaint
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "40%",
  },
  cardsContainer: {
    height: "40%",
    marginTop: "15%",
    alignItems: "center",
  },
  buttonContainer: {
    height: "10%",
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardStyle: {
    marginHorizontal: 16,
    position: "absolute",
    left: 0,
    top: "20%",
    width: "90%",
    zIndex: 1,
    borderRadius: 0,
    backgroundColor: "#1B1B1B",

  },
  cardText: {
    textAlign: "center",
    color:"white",
    fontSize: 24,
    marginTop: 4,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
