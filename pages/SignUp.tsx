import React, { useState } from "react";
import { View, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { defaultBtnStyle } from "../styles/btn";
import CreateCourt from "../components/signup/createCourt";
import CreateTenant from "../components/signup/joinTenant";
import { StatusBar } from "expo-status-bar";
const { height } = Dimensions.get("window");
export default function SignUp({ navigation }) {
  const theme = useTheme();
  const [court, setCourt] = useState("court");

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: theme.colors.primary,
              height: height * 0.2,
            }}
          >
            <Button
              mode="elevated"
              buttonColor={court === "court" ? theme.colors.secondary : "white"}
              textColor={court === "court" ? "white" : theme.colors.primary}
              style={{
                ...(defaultBtnStyle as any),

                height: height * 0.08,
                borderWidth: 0,
              }}
              onPress={() => setCourt("court")}
            >
              Create Court
            </Button>

            <Button
              mode="outlined"
              buttonColor={
                court === "tenant" ? theme.colors.secondary : "white"
              }
              textColor={court === "tenant" ? "white" : theme.colors.secondary}
              style={{
                ...(defaultBtnStyle as any),

                height: height * 0.08,
                borderWidth: 0,
              }}
              onPress={() => setCourt("tenant")}
            >
              Join as Tenant
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              height: height * 0.8,
            }}
          >
            {court === "court" ? (
              <CreateCourt navigation={navigation} />
            ) : (
              <CreateTenant navigation={navigation} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <StatusBar backgroundColor={"transparent"} style="dark" animated hidden/>
    </>
  );
}
