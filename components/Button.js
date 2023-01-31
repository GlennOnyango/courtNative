import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, /* @info The prop theme to detect the button variant. */ theme/* @end */,onPress }) {
  if (theme === "primary") {
    return (
      <View
      style={[styles.buttonContainer, {  borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#ad1457" }]}
          onPress={onPress}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
        </Pressable>
    </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
    buttonContainer: {
      width: 320,
      height: 68,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    button: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 16,
    },
  });
  