import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = ({
  title,
  onPress,
  customButtonStyle,
  customTextStyle,
  textStyle,
}) =>
{
   const handlePress = () => {
     if (typeof onPress === 'function') {
       onPress();
     }
   };

  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, customButtonStyle]}
      onPress={handlePress}>
      <Text style={[styles.text, customTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomButton;
