import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
export default function App() {
  const screens = {
    Login: {
      screen: Login,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#ad1457",
        },
        headerTitleStyle: {
          color: "white",
        },
      },
    },
    Admin: {
      screen: Admin,
      navigationOptions: {
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: "red",
        },
      },
    },
  };
  const Stack = createStackNavigator(screens);
  const Navigator = createAppContainer(Stack);

  return <Navigator />;
}
