import { View, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
  name: string;

  childern: any;
}

export default function CardButton({ onPress,name,childern }  : Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        {childern}
        <Text style={{color:"#ad1457"}}>{name}</Text> 
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 100,
    height: 100,
    margin: 6,
    borderWidth: 4,
    borderColor: '#ad1457',
    borderRadius: 12,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

});