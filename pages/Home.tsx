import React, { PropsWithChildren, useEffect, useRef } from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
  ViewStyle,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import AuthContext from "../context/AuthContext";
import { Card, Text, useTheme, Chip } from "react-native-paper";
import CardOptions from "../components/cardOptions";
import Logout from "../components/logout";

const { width, height } = Dimensions.get("window");

export default function Admin({ navigation }) {
  const ctx = React.useContext(AuthContext);
  const theme = useTheme();

  //add duration to FadeInViewProps

  type FadeInViewProps = PropsWithChildren<{
    style: ViewStyle;
    duration: number;
  }>;

  const FadeInView: React.FC<FadeInViewProps> = (props) => {
    const SlideInLeft = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: props.duration,
        useNativeDriver: true,
      }).start();
    }, [SlideInLeft]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          transform: [
            {
              translateX: SlideInLeft.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0],
              }),
            },
          ],
        }}
      >
        {props.children}
      </Animated.View>
    );
  };

  const imageDashboard = require("../assets/vectors/dashboard1.jpg");

  return (
    <ScrollView style={styles.container}>
      <Card
        style={{ ...styles.cardStyle, backgroundColor: theme.colors.primary }}
        elevation={1}
      >
        <ImageBackground
          style={{ width: width, height: height * 0.3 }}
          resizeMode="cover"
          resizeMethod="resize"
          source={imageDashboard}
        >
          <Card.Title
            title=""
            subtitle={``}
            subtitleStyle={{
              textAlign: "center",
              color: theme.colors.primary,
              marginTop: 4,
            }}
            titleStyle={{ ...styles.cardText, color: theme.colors.primary }}
          />
          <Card.Content style={styles.cardContent}>
            <FadeInView
              style={{
                backgroundColor: "transparent",
              }}
              duration={1000}
            >
              <Chip
                style={{
                  width: width * 0.3,
                  backgroundColor: theme.colors.primary,
                  marginBottom: 2,
                }}
                selectedColor="white"
                onPress={() => console.log("Pressed")}
                mode="outlined"
              >
                30 Homes
              </Chip>
            </FadeInView>

            <FadeInView
              style={{
                backgroundColor: "transparent",
              }}
              duration={1500}
            >
              <Chip
                style={{
                  width: width * 0.32,
                  backgroundColor: theme.colors.primary,
                }}
                onPress={() => console.log("Pressed")}
                selectedColor="white"
                mode="outlined"
              >
                20 Admins
              </Chip>
            </FadeInView>

            <FadeInView
              style={{
                backgroundColor: "transparent",
              }}
              duration={2000}
            >
              <Chip
                style={{
                  width: width * 0.35,
                  marginTop: 2,
                  backgroundColor: theme.colors.primary,
                }}
                textStyle={{ color: "white" }}
                selectedColor="white"
                onPress={() => console.log("Pressed")}
                mode="outlined"
              >
                10 Residents
              </Chip>
            </FadeInView>
          </Card.Content>
        </ImageBackground>
      </Card>

      <View style={styles.cardsContainer}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            variant="titleLarge"
            style={{ textAlign: "left", color: theme.colors.primary }}
          >
            Administrative options
          </Text>
          <Entypo name="list" size={24} color={theme.colors.primary} />
        </View>

        <ScrollView style={{ backgroundColor: "transparent" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
              backgroundColor: "transparent",
            }}
          >
            <CardOptions
              firstText="Users"
              secondText="200"
              Icon={<FontAwesome name="users" size={24} color="white" />}
              press={`User`}
              navigation={navigation}
            />

            <CardOptions
              firstText="Court"
              secondText="1"
              Icon={<Fontisto name="treehouse" size={24} color="white" />}
              press={`Courts`}
              navigation={navigation}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
            }}
          >
            <CardOptions
              firstText="Houses"
              secondText="200"
              Icon={<FontAwesome5 name="house-user" size={24} color="white" />}
              press={`Houses`}
              navigation={navigation}
            />

            <CardOptions
              firstText="Bill Items"
              secondText="2"
              Icon={
                <FontAwesome5
                  name="money-bill-wave-alt"
                  size={24}
                  color="white"
                />
              }
              press={`Bills`}
              navigation={navigation}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 8,
            }}
          >
            <CardOptions
              firstText="Payments"
              secondText="86"
              Icon={
                <MaterialIcons
                  name="person-pin-circle"
                  size={24}
                  color="white"
                />
              }
              press={`Payments`}
              navigation={navigation}
            />

            <CardOptions
              firstText="Notifications"
              secondText="10"
              Icon={<AntDesign name="notification" size={24} color="white" />}
              press={`Notifications`}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </View>
      <Logout navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e5f5",
  },

  cardStyle: {
    height: height * 0.3,
    zIndex: 1,
    borderRadius: 0,
  },
  cardsContainer: {
    height: height * 0.7,
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: 12,
  },
});
