import { useEffect } from "react";

import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { AuthContextProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import AddUser from "./components/users/AddUser";
import AddBlock from "./components/block/AddBlock";
import Courts from "./pages/Courts";
import CustomNavigationBar from "./components/CustomNavigationBar";
import AddCourt from "./components/courts/AddCourt";

import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
} from "@expo-google-fonts/space-mono";
import SignUp from "./pages/SignUp";

export default function App() {
  const stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
  });

  useEffect(() => {
    async () => {
      if (fontsLoaded) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
      }
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0d47a1",
      secondary: "#1565c0",
      error: "#dd2c00",
    },
  };

  return (
    <NavigationContainer>
      <AuthContextProvider>
        <PaperProvider theme={theme}>
          <stack.Navigator
            screenOptions={{
              header: (props: NativeStackHeaderProps) => (
                <CustomNavigationBar
                  navigation={props.navigation}
                  back={props.back}
                  route={props.route}
                />
              ),
            }}
          >
            <stack.Group
              screenOptions={{
                headerStyle: { backgroundColor: "#ad1457" },
                headerTitleStyle: {
                  color: "blue",
                },
              }}
            >
              <stack.Screen name="Login" component={Login} />

              <stack.Screen name="SignUp" component={SignUp} />
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

          <StatusBar backgroundColor="transparent" animated hidden />
        </PaperProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
