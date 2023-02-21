import { Appbar } from "react-native-paper";

function CustomNavigationBar({ navigation, back, route }) {
  return (
    <>
      {route.name === "Home" ? null : (
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
