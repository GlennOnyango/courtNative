import { Appbar } from "react-native-paper";

type Props = {
  navigation: any;
  back: any;
  route: any;
};

function CustomNavigationBar({ navigation, back, route }: Props) {
  const noBarList = ["Home","Login"];
  const presence = noBarList.find((e) => e === route.name);

  return (
    <>
      {presence ? null : (
        <Appbar.Header
          mode="center-aligned"
          elevated
          style={{ backgroundColor: "#000" }}
        >
          {back ? (
            back.title != "Login" ? (
              <Appbar.BackAction onPress={navigation.goBack} color={'white'} />
            ) : null
          ) : null}
          <Appbar.Content title={route.name} titleStyle={{ color: "white" }} />
        </Appbar.Header>
      )}
    </>
  );
}
export default CustomNavigationBar;
