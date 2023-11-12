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
import User from "./pages/User";
import AddUser from "./components/users/AddUser";
import CustomNavigationBar from "./components/CustomNavigationBar";
import AddCourt from "./components/courts/AddCourt";

import Home from "./pages/Home";
import * as SplashScreen from "expo-splash-screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  useFonts,
  SpaceMono_400Regular,
  SpaceMono_400Regular_Italic,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic,
} from "@expo-google-fonts/space-mono";
import SignUp from "./pages/SignUp";
import AddHouse from "./components/block/AddHouse";
import HouseList from "./components/block/ListHouse";
import CreateBill from "./components/bills/createBills";
import BillsList from "./components/bills/listBills";
import MakePayment from "./components/payment/makePayment";

export default function App() {
  const stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_400Regular_Italic,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
  });

  const Tab = createMaterialTopTabNavigator();

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

  function UsersTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen name="Add user" component={AddUser} />
        <Tab.Screen name="User list" component={User} />
      </Tab.Navigator>
    );
  }

  function CourtsTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: { backgroundColor: "white" },
        }}
      >
        {/* <Tab.Screen name="Courts list" component={Courts} /> */}
        <Tab.Screen name="Request Admin Change" component={AddCourt} />
      </Tab.Navigator>
    );
  }

  //Create a house tab
  function HouseTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen name="Add House" component={AddHouse} />
        <Tab.Screen name="House list" component={HouseList} />
      </Tab.Navigator>
    );
  }

  function BillsTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen name="Create Bill" component={CreateBill} />
        <Tab.Screen name="Bills list" component={BillsList} />
      </Tab.Navigator>
    );
  }

  function PaymentsTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen name="Make Payment" component={MakePayment} />
      </Tab.Navigator>
    );
  }

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

              <stack.Screen name="Create Court" component={AddCourt} />

              <stack.Screen name="SignUp" component={SignUp} />
              <stack.Screen name="Add User" component={AddUser} />
              <stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerBackVisible: false,
                }}
              />
              <stack.Screen
                name="User"
                component={UsersTab}
                options={{
                  headerShown: true,
                }}
              />
              <stack.Screen
                name="Courts"
                component={CourtsTab}
                options={{
                  headerShown: true,
                }}
              />
              <stack.Screen
                name="Houses"
                component={HouseTab}
                options={{
                  headerShown: true,
                }}
              />
              <stack.Screen
                name="Bills"
                component={BillsTab}
                options={{
                  headerShown: true,
                }}
              />

              <stack.Screen
                name="Payments"
                component={PaymentsTab}
                options={{
                  headerShown: true,
                }}
              />
            </stack.Group>
          </stack.Navigator>

          <StatusBar backgroundColor="transparent" style="dark" animated />
        </PaperProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
