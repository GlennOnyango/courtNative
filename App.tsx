import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackHeaderProps } from "@react-navigation/native-stack";

import { AuthContextProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import AddUser from "./components/users/AddUser";
import AddBlock from "./components/block/AddBlock";
import Courts from "./pages/Courts";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import CustomNavigationBar from "./components/CustomNavigationBar";
import AddCourt from "./components/courts/AddCourt";

export default function App() {
  const stack = createNativeStackNavigator();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <stack.Navigator
            screenOptions={{
              header: (props:NativeStackHeaderProps) => <CustomNavigationBar navigation={props.navigation} back={props.back} route={props.route} />,
            }}
          >
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
                  headerBackVisible: false,
                  
                }}
              />
              <stack.Screen
                name="User"
                component={User}
                options={
                  {
                    //headerBackVisible:false
                  }
                }
              />
              <stack.Screen name="Courts" component={Courts} />
              <stack.Screen name="Add Courts" component={AddCourt} />
              <stack.Screen name="Add User" component={AddUser} />
              <stack.Screen name="Add Block" component={AddBlock} />
            </stack.Group>
          </stack.Navigator>

          <StatusBar backgroundColor="transparent" animated hidden/>
        </PaperProvider>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
