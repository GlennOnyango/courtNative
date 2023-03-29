import { Appbar } from "react-native-paper";

import { useTheme } from "react-native-paper";
type Props = {
  navigation: any;
  back: any;
  route: any;
};

function CustomNavigationBar({ navigation, back, route }: Props) {
  const theme = useTheme();
  const noBarList = ["Home","Login"];
  const presence = noBarList.find((e) => e === route.name);

  const tit = route.name === "Login" ? "DigiCourt" : route.name;

  return (
    <>
      {presence ? null : (
        <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
          {back ? (
            back.title != "Login" ? (
              <Appbar.BackAction onPress={navigation.goBack} color={"white"}  />
            ) : null
          ) : null}
          <Appbar.Content title={tit} titleStyle={{ color: "white",fontFamily: "SpaceMono_700Bold" }} />
          <Appbar.Action
            icon="lifebuoy"
            color="white"
            size={32}
            onPress={() => {}}
          />
        </Appbar.Header>
      )}
    </>
  );
}
export default CustomNavigationBar;
