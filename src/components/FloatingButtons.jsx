import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import floatingButtonStyles from '../styles/components/floatingButtonStyles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FloatingButton = ({iconName, onButtonClick}) => {
  return (
    <TouchableOpacity
      style={floatingButtonStyles.fabButton}
      onPress={async () => {
        onButtonClick();
      }}>
      <FontAwesome5 name={iconName} size={35} color={Colors.black} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
