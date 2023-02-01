import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { StatusBar } from "expo-status-bar";
export default function App() {
  const screens = {
    Login: {
      screen: Login,
    },
    Admin: {
      screen: Admin,
      navigationOptions: {
        headerLeft: () => null,
      },
    },
  };

  const Stack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#ad1457",
      },
      headerTitleStyle: {
        color: "white",
      },
    },
  });
  const Navigator = createAppContainer(Stack);

  return (
    <>
      <Navigator />
      <StatusBar style="light" />
    </>
  );
}
