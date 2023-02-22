import { Appbar } from "react-native-paper";

function CustomNavigationBar({ navigation, back, route }) {
  const noBarList = ["Home", "Login"];
  const presence = noBarList.find((e) => e === route.name);
  return (
    <>
      {presence ? null : (
        <Appbar.Header mode="center-aligned" elevated>
          {back ? (
            back.title != "Login" ? (
              <Appbar.BackAction onPress={navigation.goBack} />
            ) : null
          ) : null}
          <Appbar.Content title={route.name} />
        </Appbar.Header>
      )}
    </>
  );
}
export default CustomNavigationBar;
