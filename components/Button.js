import { StyleSheet, View, Pressable, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function Button({
  label,
  /* @info The prop theme to detect the button variant. */ theme /* @end */,
  onPress,
  disbaled,
  btnIcon
}) {
  if (theme === "primary") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: `${!disbaled ? "#9e9e9e": "#ad1457"}`  }]}
          onPress={onPress}
          disabled={!disbaled}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={onPress}
      >
        {btnIcon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 2,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
