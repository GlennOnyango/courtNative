import React from "react";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContextProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import GetUser from "./components/GetUser";
import AddUser from "./components/AddUser";
import { TextInput } from "react-native";
import AddBlock from "./components/block/AddBlock";

export default function App() {
  const stack = createNativeStackNavigator();

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Group
            screenOptions={{
              headerStyle: { backgroundColor: "#ad1457" },
              headerTitleStyle: {
                color: "white",
              },
            }}
          >
            <stack.Screen name="Login" component={Login} />
            <stack.Screen
              name="Home"
              component={Home}
              options={{
                headerBackVisible:false,
              }}
            />
            <stack.Screen
              name="User"
              component={User}
              options={{
                //headerBackVisible:false
              }}
            />
            <stack.Screen
              name="AddUser"
              component={AddUser}
            />
            <stack.Screen
              name="GetUser"
              component={GetUser}
              
              options={{
                headerTitleStyle:
                <TextInput
                  placeholder="0724258876"
                  inputMode={"tel"}
                  keyboardType={"phone-pad"}
                  maxLength={10}
                />
              }}
            />
            <stack.Screen
              name="AddBlock"
              component={AddBlock}
            />
          </stack.Group>
        </stack.Navigator>

        <StatusBar style="light" />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
