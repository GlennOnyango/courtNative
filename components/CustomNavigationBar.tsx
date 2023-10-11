import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

import { useTheme } from "react-native-paper";
type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  back: any;
  route: any;
};

function CustomNavigationBar({ navigation, back, route }: Props) {
  const theme = useTheme();
  const noBarList = ["Home", "Login", "SignUp"];
  const presence = noBarList.find((e) => e === route.name);

  const tit = route.name === "Login" ? "DigiCourt" : route.name;

  return (
    <>
      {presence ? null : (
        <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
          {back ? (
            back.title != "Login" ? (
              <Appbar.BackAction onPress={navigation.goBack} color={"white"} />
            ) : null
          ) : null}
          <Appbar.Content
            title={tit}
            titleStyle={{ color: "white", fontFamily: "SpaceMono_700Bold" }}
          />
          {/* <Appbar.Action
            icon="lifebuoy"
            color="white"
            size={32}
            onPress={() => {}}
          /> */}
        </Appbar.Header>
      )}
    </>
  );
}
export default CustomNavigationBar;
