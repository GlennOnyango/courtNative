import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    alignItems: "center",
    zIndex: 1,
    width: width,
    height: height / 2,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  containerGroup: {
    marginVertical: 4,
    paddingHorizontal: 5,
    width: "100%",
    paddingVertical: 4,
  },
  input: {
    width: "100%",
    height: 50,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
