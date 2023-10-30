import { View, SafeAreaView, ScrollView } from "react-native";

import { StatusBar } from "expo-status-bar";
import CreateAccount from "../components/signup/createAccount";

type Props = {
  navigation: any;
};

export default function SignUp({ navigation }: Props) {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              flex: 1,
            }}
          >
            <CreateAccount navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <StatusBar backgroundColor={"transparent"} style="dark" animated hidden />
    </>
  );
}
